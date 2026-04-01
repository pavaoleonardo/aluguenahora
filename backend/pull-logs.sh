ssh root@187.77.57.10 "pm2 logs aluguenahora-backend --lines 50 --nostream > /root/backend-debug.log"
scp root@187.77.57.10:/root/backend-debug.log .
