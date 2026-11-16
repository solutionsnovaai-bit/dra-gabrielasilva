import { SITE } from '../config/site'

export function whatsapp(assunto?: string) {
  const mensagem = assunto
    ? `Olá! Vim pelo site da Les Vivée Clinic e gostaria de saber mais sobre ${assunto}.`
    : 'Olá! Vim pelo site da Les Vivée Clinic e gostaria de agendar uma avaliação.'
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(mensagem)}`
}
