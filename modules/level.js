module.exports = {
  stringify: data => {
    let array = [];
    data.forEach(row => {
      array.push(row.join(''));
    });
    return array.join('\n');
  },
  createLevels: (land, sky, ball, star, volt) => {
    return [
      [
        [sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky],
        [sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky],
        [sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky],
        [sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky],
        [sky, ball, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, star, sky],
        [land, land, land, land, land, land, land, land, land, land, land, land, land, land, land, land]
      ],
      [
        [sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky],
        [sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky],
        [sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky],
        [sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky],
        [sky, ball, sky, sky, sky, volt, sky, sky, sky, sky, volt, sky, sky, sky, star, sky],
        [land, land, land, land, land, land, land, land, land, land, land, land, land, land, land, land]
      ],
      [
        [sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky],
        [sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky],
        [sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky],
        [sky, ball, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, star, sky],
        [land, land, land, sky, land, land, sky, land, land, sky, land, land, sky, land, land, land]
      ],
      [
        [sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky],
        [sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky],
        [sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, sky, star, sky],
        [sky, sky, sky, sky, sky, sky, sky, volt, sky, sky, sky, land, land, land, land, land],
        [sky, ball, sky, sky, land, land, land, land, land, land, land, land, land, land, land, land],
        [land, land, land, land, land, land, land, land, land, land, land, land, land, land, land, land]
      ],
    ]
  }
}