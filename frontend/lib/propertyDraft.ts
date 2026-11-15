/**
 * Local draft for the "Anunciar imóvel" form.
 *
 * Miro board, `Página Anunciar Imóvel` — orientations 11 ("Botão Salvar rascunho") and
 * 12 ("Recuperação e edição do rascunho"). There is no staging server and no `rascunho`
 * content type in Strapi (SPEC.md §3), so the draft lives in the visitor's own
 * `localStorage`: it survives a reload/closed tab on the same browser, and it is cleared
 * the moment the property is actually created.
 *
 * Only the text fields are stored. `File` objects cannot be serialised, so photos and the
 * video must be picked again — the UI says that out loud instead of pretending otherwise.
 *
 * Read through `usePropertyDraft()`: it is an external store (`useSyncExternalStore`), so
 * restoring is a click handler and never a `setState` inside an effect — the repo's
 * `react-hooks/set-state-in-effect` rule stays green — and the server snapshot is `null`,
 * so there is no hydration mismatch on the prerendered page.
 */

import { useSyncExternalStore } from 'react'

export type PropertyDraftForm = {
  titulo: string
  descricao: string
  preco: string
  condominio: string
  iptu: string
  quartos: string
  banheiros: string
  bairro: string
  cidade: string
  finalidade: string
  tipo: string
  estado: string
  tamanho: string
  area_total: string
  endereco: string
  caracteristicas: string[]
  video_url: string
  vagas: string
}

export type PropertyDraft = {
  /** Owner of the draft, so two accounts on the same browser never see each other's. */
  userId: string | null
  /** ISO timestamp of the last save. */
  savedAt: string
  form: PropertyDraftForm
}

export const PROPERTY_DRAFT_KEY = 'aluguenahora:rascunho-imovel'

const listeners = new Set<() => void>()

/** Snapshot cache: `getSnapshot` must return a stable reference or React loops. */
let cachedRaw: string | null | undefined
let cachedDraft: PropertyDraft | null = null

function emit() {
  listeners.forEach((listener) => listener())
}

function parseDraft(raw: string | null): PropertyDraft | null {
  if (!raw) return null
  try {
    const parsed: unknown = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return null
    const candidate = parsed as Partial<PropertyDraft>
    if (!candidate.form || typeof candidate.form !== 'object') return null

    const form = candidate.form as Partial<PropertyDraftForm>
    return {
      userId: typeof candidate.userId === 'string' ? candidate.userId : null,
      savedAt: typeof candidate.savedAt === 'string' ? candidate.savedAt : new Date(0).toISOString(),
      form: {
        titulo: form.titulo ?? '',
        descricao: form.descricao ?? '',
        preco: form.preco ?? '',
        condominio: form.condominio ?? '',
        iptu: form.iptu ?? '',
        quartos: form.quartos ?? '',
        banheiros: form.banheiros ?? '',
        bairro: form.bairro ?? '',
        cidade: form.cidade ?? '',
        finalidade: form.finalidade ?? '',
        tipo: form.tipo ?? '',
        estado: form.estado ?? '',
        tamanho: form.tamanho ?? '',
        area_total: form.area_total ?? '',
        endereco: form.endereco ?? '',
        caracteristicas: Array.isArray(form.caracteristicas)
          ? form.caracteristicas.filter((item): item is string => typeof item === 'string')
          : [],
        video_url: form.video_url ?? '',
        vagas: form.vagas ?? '',
      },
    }
  } catch {
    return null
  }
}

function readDraft(): PropertyDraft | null {
  if (typeof window === 'undefined') return null
  let raw: string | null = null
  try {
    raw = window.localStorage.getItem(PROPERTY_DRAFT_KEY)
  } catch {
    return null
  }
  if (raw === cachedRaw) return cachedDraft
  cachedRaw = raw
  cachedDraft = parseDraft(raw)
  return cachedDraft
}

function subscribeDraft(callback: () => void) {
  listeners.add(callback)
  const onStorage = (event: StorageEvent) => {
    if (event.key === PROPERTY_DRAFT_KEY) callback()
  }
  // `subscribe` only ever runs on the client, so `window` is safe here.
  window.addEventListener('storage', onStorage)
  return () => {
    listeners.delete(callback)
    window.removeEventListener('storage', onStorage)
  }
}

function getServerSnapshot(): PropertyDraft | null {
  return null
}

export function savePropertyDraft(userId: string | null, form: PropertyDraftForm): PropertyDraft | null {
  if (typeof window === 'undefined') return null
  const draft: PropertyDraft = { userId, savedAt: new Date().toISOString(), form }
  try {
    window.localStorage.setItem(PROPERTY_DRAFT_KEY, JSON.stringify(draft))
  } catch {
    // Private mode / quota exceeded: the form keeps working, it just will not be saved.
    return null
  }
  cachedRaw = undefined
  cachedDraft = null
  emit()
  return draft
}

export function clearPropertyDraft() {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.removeItem(PROPERTY_DRAFT_KEY)
  } catch {
    // Nothing to do — the draft simply stays where it is.
  }
  cachedRaw = undefined
  cachedDraft = null
  emit()
}

export function usePropertyDraft(): PropertyDraft | null {
  return useSyncExternalStore(subscribeDraft, readDraft, getServerSnapshot)
}
