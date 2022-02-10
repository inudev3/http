import dns from 'dns';
import net from 'net';
import {MyRequest} from "./Request.js";
import {MyResponse} from "./Response.js";


const client = new net.Socket();
const addressses = [
    `www.hani.co.kr`,
`www.disney.co.kr`,
    `www.khan.co.kr`,
        `www.yes24.com`,
            `www.kyobobook.co.kr`,
]
const promises = []
let hosts;
const options= {
    hints: dns.ADDRCONFIG | dns.V4MAPPED,
    all:true
}
for(const address of addressses){
    promises.push(new Promise((res,rej)=>{
        console.log(`http://`+address);
        console.log("(DNS Lookup...)");
       dns.lookup(address, (err,host)=>{
           res({address, host})
       })
    }))
}
hosts = await Promise.all(promises);

const port = 80;
client.connect(port, hosts[1].host, ()=>{
    console.log(`TCP Connection:${hosts[1].host} ${port}`);
    const request = new MyRequest({}, hosts[1], port).message();
    console.log(request);
    client.write(request);
})
client.on('data', serverData=>{
    const response = new MyResponse(serverData.toString());
    console.log(response.headers);
    console.log('\n'+ response.body)
    setTimeout(()=>client.destroy(), 3000);

})




