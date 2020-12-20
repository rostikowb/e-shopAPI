import {Telegraf} from "telegraf";

export class Bot {
  #bot
  #chatId = ['314811066']
  #CRM
  #msg

  constructor(token) {
    this.#bot = new Telegraf(token)
    this.#CRM = process.env.CRM
  }

  #selectMsg = (type, id)=>{
    switch (type) {
      case "bought":
        this.#msg = `Нове замовлення! ${this.#CRM}/orders/${id}`;
        break;
      case "ticket":
        this.#msg = `Новий тікет! ${this.#CRM}/tickets`;
        break;
    }
  }

  start = async ()=>{
    this.#bot.start((ctx) => ctx.reply('Система сповіщення vsivuha.online'))
    // this.#bot.hears('hi', (ctx) => ctx.reply('Hey there'))
    await this.#bot.launch()
  }

  newOrder = async (props) => {
    const {id, type} = props
    this.#selectMsg(type, id)
    this.#chatId.forEach(item=> {
      this.#bot.telegram.sendMessage(item, this.#msg)
    })
  }

}

// export const telegramNewOrders = () =>{
//
//   const bot = new Telegraf(process.env.BOT_TOKEN_ORDERS)
//   bot.start((ctx) => ctx.reply('Welcome!'))
//   bot.help((ctx) => ctx.reply('Send me a sticker'))
//   bot.on('sticker', (ctx) => ctx.reply('👍'))
//   bot.hears('hi', (ctx) => ctx.reply('Hey there'))
//   bot.launch()
// }