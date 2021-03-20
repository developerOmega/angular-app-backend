class Init {

  index(req, res) {
    res.status(200).json({
      ok: true,
      message: "estamos en la ruta de init"
    })
  }

  show(req, res) {
    const id = req.params.id;

    res.status(200).json({
      ok: true,
      message: `Esta es la ruta de ${id}`
    });
  }

}

module.exports = Init