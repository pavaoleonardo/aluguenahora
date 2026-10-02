// Subject / text / html of the e-mail Strapi's admin panel sends from its own
// "Esqueceu sua senha?" form (`POST /admin/forgot-password`).
//
// WHY THIS EXISTS: Strapi's stock template (`@strapi/admin`, config/email-templates/forgot-password.js)
// is the English `<p><%= url %></p>` — a ***bare URL inside a paragraph***, so Gmail/Outlook/the
// Windows mail app show it as plain text and the admin cannot click it (reported by the owner
// 2026-10-02, after the forgot-password disclosure work in `src/index.ts` block 0c). The fix is
// the anchor tag below, NOT a template edit in the admin UI: the admin plugin has no
// "Email templates" screen (that one belongs to users-permissions), it only reads this config.
//
// `url` is built by Strapi as `${admin.absoluteUrl}/auth/reset-password?code=<token>`; the only
// interpolation variables available here are `url` and `user` (`user.email`, `user.firstname`,
// `user.lastname`, `user.username`) — `createStrictInterpolationRegExp` rejects anything else at
// render time, so do not reach for others. `from`/`replyTo` are intentionally NOT set: they stay
// undefined and the e-mail plugin falls back to `settings.defaultFrom` in `config/plugins.ts`.
const resetPasswordEmail = {
  subject: 'Redefinir senha do painel — Alugue na Hora',
  text: [
    'Olá,',
    '',
    'Recebemos um pedido para redefinir a senha da sua conta de administrador do Alugue na Hora.',
    '',
    'Abra o endereço abaixo no navegador para criar uma nova senha:',
    '',
    '<%= url %>',
    '',
    'Se você não pediu essa redefinição, ignore este e-mail: sua senha continua a mesma.',
  ].join('\n'),
  html: [
    '<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#1f2937">',
    '  <p>Olá,</p>',
    '  <p>Recebemos um pedido para redefinir a senha da sua conta de administrador do',
    '     <strong>Alugue na Hora</strong>.</p>',
    '  <p style="margin:28px 0">',
    '    <a href="<%= url %>"',
    '       style="background:#f97316;color:#ffffff;padding:12px 22px;border-radius:6px;text-decoration:none;font-weight:bold;display:inline-block">',
    '      Redefinir minha senha',
    '    </a>',
    '  </p>',
    '  <p>Se o botão não funcionar, copie este endereço e cole no navegador:</p>',
    '  <p style="word-break:break-all">',
    '    <a href="<%= url %>" style="color:#2563eb;text-decoration:underline"><%= url %></a>',
    '  </p>',
    '  <p style="color:#6b7280;font-size:13px">Se você não pediu essa redefinição, ignore este e-mail:',
    '     sua senha continua a mesma.</p>',
    '</div>',
  ].join('\n'),
};

export default ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  forgotPassword: {
    emailTemplate: resetPasswordEmail,
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  secrets: {
    encryptionKey: env('ENCRYPTION_KEY'),
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
});
