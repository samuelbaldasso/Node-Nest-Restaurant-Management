declare const _default: () => {
    port: number;
    database: {
        url: string;
    };
    jwt: {
        secret: string;
        expiresIn: string;
    };
    google: {
        clientId: string;
        clientSecret: string;
        callbackUrl: string;
    };
};
export default _default;
