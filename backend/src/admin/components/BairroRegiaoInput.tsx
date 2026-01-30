import React from 'react';
import { useIntl } from 'react-intl';

type BairroRegiaoValue = {
  regiao: string;
  bairro: string;
};

type InputProps = {
  attribute: { type: string };
  disabled?: boolean;
  intlLabel: { id: string; defaultMessage: string };
  name: string;
  onChange: (event: { target: { name: string; type: string; value: BairroRegiaoValue } }) => void;
  required?: boolean;
  value?: BairroRegiaoValue | string | null;
};

const bairrosPorRegiao: Record<string, string[]> = {
  Centro: [
    'Amambaí',
    'Bela Vista',
    'Cabreúva',
    'Carvalho',
    'Centro',
    'Cruzeiro',
    'Glória',
    'Itanhangá',
    'Jardim dos Estados',
    'Monte Líbano',
    'Planalto',
    'São Bento',
    'São Francisco',
  ],
  Segredo: [
    'Coronel Antonino',
    'José Abrão',
    'Mata do Segredo',
    'Monte Castelo',
    'Nasser',
    'Nova Lima',
    'Seminário',
  ],
  Prosa: [
    'Autonomista',
    'Carandá',
    'Chácara Cachoeira',
    'Chácara dos Poderes',
    'Estrela Dalva',
    'Margarida',
    'Mata do Jacinto',
    'Noroeste',
    'Novos Estados',
    'Santa Fé',
    'Veraneio',
  ],
  Bandeira: [
    'Carlota',
    'Dr. Albuquerque',
    'Jardim Paulista',
    'Maria Aparecida Pedrossian',
    'Moreninha',
    'Rita Vieira',
    'São Lourenço',
    'TV Morena',
    'Tiradentes',
    'Universitário',
    'Vilasboas',
  ],
  Anhanduizinho: [
    'Aero Rancho',
    'Alves Pereira',
    'América',
    'Centenário',
    'Centro-Oeste',
    'Guanandi',
    'Jacy',
    'Jockey Club',
    'Lageado',
    'Los Angeles',
    'Parati',
    'Pioneiros',
    'Piratininga',
    'Taquarussu',
  ],
  Lagoa: [
    'Bandeirantes',
    'Batistão',
    'Caiobá',
    'Caiçara',
    'Coophavila II',
    'Leblon',
    'São Conrado',
    'Tarumã',
    'Taveirópolis',
    'Tijuca',
    'União',
  ],
  Imbirussu: [
    'Nova Campo Grande',
    'Núcleo Industrial',
    'Panamá',
    'Popular',
    'Santo Amaro',
    'Santo Antônio',
    'Sobrinho',
  ],
};

const Input = React.forwardRef<HTMLSelectElement, InputProps>(
  ({ attribute, disabled, intlLabel, name, onChange, required, value }, ref) => {
    const { formatMessage } = useIntl();
    const label =
      intlLabel && intlLabel.id
        ? formatMessage(intlLabel)
        : intlLabel?.defaultMessage || 'Bairro (com região)';
    const current =
      value && typeof value === 'object'
        ? value
        : { regiao: '', bairro: typeof value === 'string' ? value : '' };

    const handleRegiaoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const regiao = event.target.value;
      onChange({
        target: {
          name,
          type: attribute.type,
          value: { regiao, bairro: '' },
        },
      });
    };

    const handleBairroChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const bairro = event.target.value;
      onChange({
        target: {
          name,
          type: attribute.type,
          value: { regiao: current.regiao, bairro },
        },
      });
    };

    return (
      <div style={{ display: 'grid', gap: '12px' }}>
        <label style={{ fontWeight: 600 }}>{label}</label>
        <div style={{ display: 'grid', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: 6 }}>Região</label>
            <select
              name={`${name}.regiao`}
              value={current.regiao}
              onChange={handleRegiaoChange}
              disabled={disabled}
              required={required}
              style={{ width: '100%', padding: '8px 10px' }}
            >
              <option value="">Selecione a região</option>
              {Object.keys(bairrosPorRegiao).map((regiao) => (
                <option key={regiao} value={regiao}>
                  {regiao}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 6 }}>Bairro</label>
            <select
              ref={ref}
              name={`${name}.bairro`}
              value={current.bairro}
              onChange={handleBairroChange}
              disabled={disabled || !current.regiao}
              required={required}
              style={{ width: '100%', padding: '8px 10px' }}
            >
              <option value="">
                {current.regiao ? 'Selecione o bairro' : 'Selecione a região primeiro'}
              </option>
              {(bairrosPorRegiao[current.regiao] || []).map((bairro) => (
                <option key={bairro} value={bairro}>
                  {bairro}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    );
  }
);

Input.displayName = 'BairroRegiaoInput';

export default Input;
