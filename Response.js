export class MyResponse{
    #responseLine
    #statusCode;
    #contentLength;
    #headers;
    #body;
    constructor(str) {
        const response = str.split('\r\n');
        this.#responseLine = response[0]
        this.#statusCode = parseInt(response[0].split(' ')[1]);
        const header=[this.#responseLine];
        for(let i=1; i<response.length-1;i++){
            response[i].includes('Content-Length')?
                this.#contentLength = parseInt(response[i].split(':')[1].trim()):
                header.push(response[i])
        }
        this.#headers = header.join('\r\n');
        if(this.#contentLength)
        this.#body = Buffer.alloc(this.#contentLength, response[response.length-1], 'utf-8');
        else{
            this.#body = Buffer.from(response[response.length-1], 'utf-8');
        }

    }
    get headers(){
        return this.#headers;
    }
    get body(){
        return this.#body.toString();
    }

}