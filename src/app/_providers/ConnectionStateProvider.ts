import { Injectable } from '@angular/core'
import { Network } from '@ionic-native/network/ngx';

@Injectable()
export class ConnectionStateProvider {
  public networkState: boolean
  private disconnect
  private connect

  constructor(private network: Network) {
    this.disconnect = this.network.onDisconnect().subscribe(() => {
      this.networkState = false
    })

    this.connect = this.network.onConnect().subscribe(() => {
      this.networkState = true
    })
  }
}