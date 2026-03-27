declare const _default: () => {
    port: number;
    database: {
        url: string | undefined;
    };
    jwt: {
        secret: string | undefined;
        expiresIn: string;
    };
    google: {
        clientId: string | undefined;
        clientSecret: string | undefined;
        callbackUrl: string | undefined;
    };
};
export default _default;
