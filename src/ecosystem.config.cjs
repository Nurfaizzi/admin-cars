module.exports = {
  apps : [{
    name :"admin-car-rental",
    script : "serve",
    args : "-s build",
    error_file : "./pm2-error.log",
    out_file : "./pm2-out.log",
    env : {
      NODE_ENV: "production",
    }
  }]
}