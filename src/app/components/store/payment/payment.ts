import { Component, Renderer2 } from '@angular/core';
import { loadMercadoPago } from '@mercadopago/sdk-js';
import { environment } from '../../../../environments/environment';
import { storeService } from '../../../services/store.service';
import { Router } from '@angular/router';

declare global {
  interface Window {
    MercadoPago: any;
    paymentBrickController: any;
    MP_DEVICE_SESSION_ID: any;
  }
}

@Component({
  standalone: true,
  selector: 'app-payment',
  imports: [],
  templateUrl: './payment.html',
  styleUrl: './payment.css',
})
export class Payment {
  public mp;
  public trabajador: any;
  public deviceSessionId = '';
  isWallet = false;

  constructor(
    private _storeService: storeService,
    private renderer: Renderer2,
    private router: Router
  ) {}

  ngOnInit() {
    const nav = history.state;
    if (nav && nav.trabajador) {
      this.trabajador = nav.trabajador;
    }

    this.loadSecurityScript();
    this.initMP();
    this.getPreference();
  }

  async initMP() {
    await loadMercadoPago();
    this.mp = new window.MercadoPago(environment.mercadopagoPK, {
      locale: 'es-MX',
    });
  }

  loadSecurityScript() {
    const script = this.renderer.createElement('script');
    script.src = 'https://www.mercadopago.com/v2/security.js';
    script.setAttribute('view', 'checkout');
    this.renderer.appendChild(document.body, script);
  }

  getPreference() {
    this._storeService.getPreference().subscribe({
      next: (response) => {
        if (response.status === 'success') {
          this.initWallet(response.data.id);
        }
      }
    });
  }

  initWallet(idPreference) {
    const bricksBuilder = this.mp.bricks();
    this.isWallet = true;

    const renderPaymentBrick = async () => {
      if (window.paymentBrickController)
        await window.paymentBrickController.unmount();

      const settings = {
        initialization: {
          amount: 100,
          preferenceId: idPreference,
        },
        customization: {
          visual: { hidePaymentButton: true },
        },
        callbacks: {}
      };

      window.paymentBrickController = await bricksBuilder.create(
        'payment',
        'paymentBrick_container',
        settings
      );
    };

    renderPaymentBrick();
  }

  submitPurchase() {
    if (window.paymentBrickController) {
      window.paymentBrickController.getFormData().then(({ formData }) => {
        this.registerPurchase(formData);
      });
    }
  }

  registerPurchase(formData) {
    if (window.MP_DEVICE_SESSION_ID)
      this.deviceSessionId = window.MP_DEVICE_SESSION_ID;

    const data = {
      formdata: formData,
      idfoliocarrito: this.trabajador.id_trabajador,
      iddevice: this.deviceSessionId,
      trabajador: this.trabajador
    };

    this._storeService.processPayment(data).subscribe({
      next: (response) => {
        if (response.status === 'success') {
          this.router.navigate(['/store/product', this.trabajador.id_trabajador], {
            state: { pago: response.data }
          });
        }
      }
    });
  }
}

