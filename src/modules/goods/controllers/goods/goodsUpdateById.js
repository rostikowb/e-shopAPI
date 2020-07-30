import Todo from '../../models/GoodsModel';

export default async function todoUpdateById(req, res) {
  const id = req.params.newsId;

  Todo.update({ _id: id }, { $set: req.body })
    .exec()
    .then(doc => {
      if (doc.n) {
        res.status(200).json('Todo updated');
      } else {
        res.status(400).json('Todo not found');
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
}
