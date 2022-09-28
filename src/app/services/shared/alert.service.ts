import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class AlertService {
    constructor(private snackBar: MatSnackBar) {}

    showInfo(message: string) {
        this.showMessage(message, 'alertInfo');
    }

    showSuccess(message: string) {
        this.showMessage(message, 'alertSuccess');
    }

    showError(message: string) {
        this.showMessage(message, 'alertError');
    }

    private showMessage(message: string, classe: string) {
        this.snackBar.open(message, 'X', {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration: 3000,
            panelClass: [classe]
        });
    }

    confirm(message: string, yesFn: () => void, notFn: () => void) {
        const confirmacao = confirm(message);
        if (confirmacao == true) {
            yesFn();
        }
        else {
            notFn();
        }
    }
}