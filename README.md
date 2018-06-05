#DEPENDS
```
sudo npm install -g bower
bower install
```

# PROD SERVER FIRST START
    
```
// start process
pm2 start process.yml
// Restarting PM2 with the processes you manage on server boot/reboot is critical
pm2 startup
//sudo env PATH=$PATH:/usr/local/bin /usr/local/lib/node_modules/pm2/bin/pm2 startup systemd -u ubuntu --hp /home/ubuntu
```