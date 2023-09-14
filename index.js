const GUN = require('gun');
const os = require('os');
const uuid = require('uuid');

const agentId = uuid.v4();

const gun = GUN(['http://localhost:8765/gun']);

const getStats = () => {
  let RAM = {}
  RAM.used = `${os.totalmem() - os.freemem()}`
  RAM.free=`${os.freemem()}` 
  RAM = JSON.stringify(RAM)
  const CPU = JSON.stringify(os.cpus());
  return { host: agentId, RAM, CPU };
};

setInterval(() => {
  const stats = getStats();

  console.log(stats);

  gun.get('telemetryData').put({ [agentId]: stats });
}, 2000);
