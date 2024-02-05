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

  if (!req.user) {
    return res.status(401).send({
      error: 'Need to authenticate to do that...tokens probably invalid',
    });
  }

  if (!(title && content)) {
    return res.status(400).send({ error: 'invalid submission info' });
  }

  try {
    const createdSnippet = await Snippets.create({ ...req.body });
    await req.user.addSnippet(createdSnippet);
    res.status(201).send(createdSnippet);
  } catch (error) {
    next(error);
  }
});

snippetsRouter.patch('/:id', async (req, res, next) => {
  const { content } = req.body;
  const id = req.params.id;

  if (!content) {
    return res.status(400).send({ error: 'invalid submission info' });
  }

  const snippet = await Snippets.findByPk(id);

  if (snippet.userId !== req.user?.id) {
    return res
      .status(401)
      .send({ error: 'You are not authenticated to do that' });
  }

  try {
    snippet.content = content;
    await snippet.save();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

snippetsRouter.delete('/:id', async (req, res, next) => {
  const id = req.params.id;

  const snippet = await Snippets.findByPk(id);

  if (snippet.userId !== req.user?.id) {
    return res
      .status(401)
      .send({ error: 'You are not authenticated to do that' });
  }

  try {
    await Snippets.destroy({ where: { id } });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = snippetsRouter;
