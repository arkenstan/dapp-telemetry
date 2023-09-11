const GUN = require('gun');
const os = require('os');
const uuid = require('uuid');

const agentId = uuid.v4();

const gun = GUN(['http://localhost:3030/gun']);

const getStats = () => {
  const RAM = `${os.totalmem() - os.freemem()} / ${os.totalmem()}`;
  const CPU = JSON.stringify(os.cpus());
  return { host: agentId, RAM, CPU };
};

setInterval(() => {
  const stats = getStats();

  console.log(stats);

  gun.get('telemetryData').put({ [agentId]: stats });
}, 2000);
