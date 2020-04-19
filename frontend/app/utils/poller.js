import Object from '@ember/object'
import { later } from '@ember/runloop';

export default class Poller extends Object {

    init() {
        this.set('maxPoll', 10)
        this.set('isPolling', false)
        this.set('currentPollCount', 0)
        this.set('interval', 3000)
        this.set('cancelled', false)
    }
    async startPoll(handler, errorCallback) {
        this.set('currentPollCount', 0)
        try {
            await this.poll(handler, errorCallback)
        } catch (error) {
            errorCallback(error, errorCallback)
        }
    }
    async poll(handler, errorCallback) {
        this.set('currentPollCount', ++this.currentPollCount)
        if (this.currentPollCount < this.maxPoll) {
            let handled = await handler()
            if (!handled) {
                this.set('isPolling', true)
                later(this, this.poll, handler, errorCallback, this.interval)
            } else {
                this.set('isPolling', false)
            }
        } else {
            this.set('currentPollCount', 0)
            this.set('isPolling', false)
            errorCallback()
        }

    }
}