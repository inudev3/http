export class MyRequest{
    #options;
    #address;
    #host;
    #port;
    constructor(options, {address, host}, port) {
        this.#options = {
            method:'GET',
            Accept: 'text/html',
            Host: address,
            'User-Agent': 'Mozila/5.0',
            ...options,
        }
        this.#address = address;
        this.#host = host;
        this.#port=port;
    }
    message(){
        const startLine = `${this.#options.method} / HTTP/1.1`;
        const arr = [startLine]
        Object.entries(this.#options).map(([k,v])=>{
            arr.push(`${k}: ${v}`)
        })
        return arr.join('\r\n');
    }
}