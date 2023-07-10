const pm2 = require('pm2')

const instances = process.env.WEB_CONCURRENCY || -1
const maxMemory = process.env.WEB_MEMORY || 512

const log = (packet) => console.log('[App:%s] %s', packet.process.name, packet.data)
const error = (packet) => console.error('[App:%s][Err] %s', packet.process.name, packet.data)

pm2.connect(() => {
  pm2.start(
    {
      script: './dist/index.js',
      name: 'spud',
      exec_mode: 'cluster',
      instances,
      max_memory_restart: `${maxMemory}M`,
    },
    (err) => {
      if (err) return console.error('Error langing application', err.stack || err)

      console.log('spud succesfully started')

      pm2.launchBus((err, bus) => {
        console.log('[PM2] Log streaming started')
        bus.on('log:out', (packet) => log)
        bus.on('log:err', (packet) => error)
      })
    },
  )
})
