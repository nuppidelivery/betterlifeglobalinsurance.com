import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        interna: resolve(__dirname, 'interna.html'),
        'seguro-vida': resolve(__dirname, 'seguro-vida.html'),
        'seguro-saude': resolve(__dirname, 'seguro-saude.html'),
        'seguro-carro': resolve(__dirname, 'seguro-carro.html'),
        'seguro-residencial': resolve(__dirname, 'seguro-residencial.html'),
        'seguro-viagem': resolve(__dirname, 'seguro-viagem.html'),
        'seguro-pets': resolve(__dirname, 'seguro-pets.html'),
        'umbrella-insurance': resolve(__dirname, 'umbrella-insurance.html'),
        'seguro-bop': resolve(__dirname, 'seguro-bop.html'),
        'general-liability': resolve(__dirname, 'general-liability.html'),
        'workers-comp': resolve(__dirname, 'workers-comp.html'),
        'commercial-auto': resolve(__dirname, 'commercial-auto.html'),
        'commercial-property': resolve(__dirname, 'commercial-property.html'),
        'professional-liability': resolve(__dirname, 'professional-liability.html'),
        'cyber-liability': resolve(__dirname, 'cyber-liability.html'),
        'surety-bonds': resolve(__dirname, 'surety-bonds.html'),
        'vida-internacional': resolve(__dirname, 'vida-internacional.html'),
        'protecao-patrimonial': resolve(__dirname, 'protecao-patrimonial.html'),
        'sucessao-internacional': resolve(__dirname, 'sucessao-internacional.html'),
        'renda-dolar': resolve(__dirname, 'renda-dolar.html')
      }
    }
  }
})
