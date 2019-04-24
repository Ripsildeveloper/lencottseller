import { AbstractControl, FormGroup  } from '@angular/forms';

export function priceValue(control: AbstractControl) {
    if (control && ( control.value !== null || control.value !== undefined)) {
        const PRICE = /^[0-9]+(\.?[0-9]+)?$/;
        if (!PRICE.test(control.value)) {
            return {
                isError: true
            };
    }
    return null;
}
}
