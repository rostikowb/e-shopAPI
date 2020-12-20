import {Bot} from "../helpers/telegramBot";

export const botInit = async (app)=>{
  const TeleBot = new Bot(process.env.BOT_TOKEN_ORDERS)

  await TeleBot.start()

  app.use((req, res, next) => {
    req.TeleBot = TeleBot;
    next()
  })
}