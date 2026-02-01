import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ToastService, Toast } from './toast.service';

describe('ToastService', () => {
    let service: ToastService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ToastService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should add a success toast', (done) => {
        service.toasts$.subscribe(toasts => {
            if (toasts.length > 0) {
                expect(toasts[0].message).toBe('Success!');
                expect(toasts[0].type).toBe('success');
                expect(toasts[0].duration).toBe(3000); // default
                done();
            }
        });

        service.success('Success!');
    });

    it('should add an error toast', (done) => {
        service.toasts$.subscribe(toasts => {
            if (toasts.length > 0) {
                expect(toasts[0].message).toBe('Error!');
                expect(toasts[0].type).toBe('error');
                done();
            }
        });

        service.error('Error!');
    });

    it('should remove a toast after duration', fakeAsync(() => {
        service.show('Temporary', 'info', 1000);

        let currentToasts: Toast[] = [];
        service.toasts$.subscribe(t => currentToasts = t);

        expect(currentToasts.length).toBe(1);

        tick(1000); // Fast forward 1s

        expect(currentToasts.length).toBe(0);
    }));

    it('should remove a toast manually', () => {
        service.show('To be removed', 'info');
        let toastId = -1;

        service.toasts$.pipe().subscribe(toasts => {
            if (toasts.length > 0) toastId = toasts[0].id;
        });

        expect(toastId).not.toBe(-1);

        service.remove(toastId);

        let currentToasts: Toast[] = [];
        service.toasts$.subscribe(t => currentToasts = t);
        expect(currentToasts.find(t => t.id === toastId)).toBeUndefined();
    });
});
