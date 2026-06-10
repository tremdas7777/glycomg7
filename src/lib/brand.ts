/** Marca da loja — AiDEX G7 (Microtech Médica) */
export const brand = {
  name: "AiDEX G7",
  productName: "AiDEX G7",
  tagline: "Sistema de Monitoramento Contínuo de Glicose",
  taglineShort: "Monitoramento em Tempo Real",
  manufacturer: "Microtech Médica",
  manufacturerTagline: "Tecnologia que cuida",
  cnpj: "13.216.149/0001-54",
  email: "contato@aidex.com.br",
  whatsapp: {
    /** Número em E.164 (DDI + DDD + número), sem símbolos */
    phoneE164: "551153045904",
    display: "(11) 5304-5904",
  },
  sensorDays: 15,
  /** Mínimo por kit — 2 sensores cobrem 30 dias de monitoramento contínuo */
  sensorsPerMonth: 2,
  monitoringDaysPerMonth: 30,
  colors: {
    primary: "#84CC16",
    primaryDark: "#65A30D",
    primaryDeep: "#4D7C0F",
    onPrimary: "#ffffff",
    surfaceTint: "#F4FCE8",
  },
} as const;
