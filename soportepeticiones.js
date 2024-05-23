import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
  http.get('http://<tu-ip-publica>:<puerto>/');
  sleep(1);
}
g