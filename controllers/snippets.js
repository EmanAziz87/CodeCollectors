const snippetsRouter = require('express').Router();
const Snippets = require('../models/Snippets');

snippetsRouter.get('/', async (req, res, next) => {
  try {
    const allSnippets = await Snippets.findAll();
    res.send(allSnippets);
  } catch (error) {
    next(error);
  }
});

snippetsRouter.post('/', async (req, res, next) => {
  const { title, content } = req.body;

  if (!(title && content)) {
    return response.status(400).send({ error: 'invalid submission info' });
  }

  try {
    const createdSnippet = await Snippets.create({ ...req.body });
    res.status(201).send(createdSnippet);
  } catch (error) {
    next(error);
  }
});

snippetsRouter.patch('/:id', async (req, res, next) => {
  const { content } = req.body;
  const id = req.params.id;

  try {
    const snippet = await Snippets.findByPk(id);
    snippet.content = content;
    await snippet.save();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

snippetsRouter.delete('/:id', async (req, res, next) => {
  const id = req.params.id;

  try {
    await Snippets.destroy({ where: { id } });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = snippetsRouter;
