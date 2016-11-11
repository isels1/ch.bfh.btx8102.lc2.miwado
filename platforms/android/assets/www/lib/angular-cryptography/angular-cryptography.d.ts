// Type definitions for AngularCryptography (mdo-angular-cryptography module)
// Project: https://github.com/middleout/angular-cryptography
// Definitions by: Andrei Gabreanu <andrei.gabreanu@middleout.com>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

declare module mdo.cryptography {
    interface ICryptService {
        encrypt(message: string);
        encrypt(message: string, key: string);
        decrypt(message: string);
        decrypt(message: string, key: string);
    }

    interface ICryptProvider {
        setCryptographyKey(key: string);
    }
}
