module.exports = {
  afterCreate(event) {
    const { result } = event;

    if (result.mime.startsWith('image/')) {
      // Force URL preview from Cloudinary
      result.url = result.url.startsWith('http')
        ? result.url
        : `https://res.cloudinary.com/${process.env.CLOUDINARY_NAME}/image/upload/${result.hash}${result.ext}`;
    }
  },
};
