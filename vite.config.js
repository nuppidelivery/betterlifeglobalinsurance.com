import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        interna: resolve(__dirname, 'interna.html'),
        'vida': resolve(__dirname, 'seguros/vida.html'),
        'saude': resolve(__dirname, 'seguros/saude.html'),
        'carro': resolve(__dirname, 'seguros/carro.html'),
        'residencial': resolve(__dirname, 'seguros/residencial.html'),
        'viagem': resolve(__dirname, 'seguros/viagem.html'),
        'pets': resolve(__dirname, 'seguros/pets.html'),
        'umbrella': resolve(__dirname, 'seguros/umbrella.html'),
        'bop': resolve(__dirname, 'seguros/bop.html'),
        'general-liability': resolve(__dirname, 'seguros/general-liability.html'),
        'workers-comp': resolve(__dirname, 'seguros/workers-comp.html'),
        'commercial-auto': resolve(__dirname, 'seguros/commercial-auto.html'),
        'commercial-property': resolve(__dirname, 'seguros/commercial-property.html'),
        'professional-liability': resolve(__dirname, 'seguros/professional-liability.html'),
        'cyber-liability': resolve(__dirname, 'seguros/cyber-liability.html'),
        'surety-bonds': resolve(__dirname, 'seguros/surety-bonds.html'),
        'vida-internacional': resolve(__dirname, 'internacional/vida-internacional.html'),
        'protecao-patrimonial': resolve(__dirname, 'internacional/protecao-patrimonial.html'),
        'sucessao': resolve(__dirname, 'internacional/sucessao.html'),
        'estrategias-patrimoniais': resolve(__dirname, 'internacional/estrategias-patrimoniais.html')
      }
    }
  }
})
