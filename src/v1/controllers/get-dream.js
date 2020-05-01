module.exports = function makeGetDream ({ readDream, mapImages }) {
  return async function getDream (httpRequest) {
    const log = require('debug')('controllers:get-dream')
    try {
      log('httpRequest:', httpRequest)
      const { id, userId, images, date, caption, achieved, deleted, _id } = await readDream({ dreamId: httpRequest.body.dreamId })
      // let asd = {
      //   id: '5eabb5c53074950da43a3961',
      //   userId: '5cee0d3a0fe5f429686f6ed0',
      //   images: [
      //     {
      //       _id: '5eabb5c53074950da43a395f',
      //       type: 'dream',
      //       filename:
      //         'https://storage.googleapis.com/this-is-central/local/dream/5cee0d3a0fe5f429686f6ed0/original/3d81cba1-3ecd-4734-af2e-7b044d14ee48-applecash.jpg',
      //       path: 'gs://this-is-central/local/dream/5cee0d3a0fe5f429686f6ed0/original/3d81cba1-3ecd-4734-af2e-7b044d14ee48-applecash.jpg',
      //       meta: {
      //         fieldname: 'images',
      //         originalname: 'applecash.jpg',
      //         encoding: '7bit',
      //         mimetype: 'image/jpeg',
      //         destination: '/var/folders/8l/79bg9scd15g6rm97h2w3zk5m0000gn/T',
      //         filename: '65e4704d08e8dddcd9f4f4d51cd288e4',
      //         path: '/var/folders/8l/79bg9scd15g6rm97h2w3zk5m0000gn/T/65e4704d08e8dddcd9f4f4d51cd288e4',
      //         size: 171271
      //       },
      //       gcs: [
      //         {
      //           _id: '5eabb5c53074950da43a3958',
      //           type: 'original',
      //           filename:
      //             'https://storage.googleapis.com/this-is-central/local/dream/5cee0d3a0fe5f429686f6ed0/original/3d81cba1-3ecd-4734-af2e-7b044d14ee48-applecash.jpg',
      //           gslink: 'gs://this-is-central/local/dream/5cee0d3a0fe5f429686f6ed0/original/3d81cba1-3ecd-4734-af2e-7b044d14ee48-applecash.jpg',
      //           bucket: 'this-is-central',
      //           key: 'local/dream/5cee0d3a0fe5f429686f6ed0/original/3d81cba1-3ecd-4734-af2e-7b044d14ee48-applecash.jpg',
      //           createdAt: '2020-05-01T05:38:13.237Z',
      //           updatedAt: '2020-05-01T05:38:13.237Z',
      //           __v: 0
      //         }
      //       ],
      //       __v: 0,
      //       createdAt: '2020-05-01T05:38:13.487Z',
      //       updatedAt: '2020-05-01T05:38:13.487Z'
      //     },
      //     {
      //       _id: '5eabb5c53074950da43a3960',
      //       type: 'dream',
      //       filename:
      //         'https://storage.googleapis.com/this-is-central/local/dream/5cee0d3a0fe5f429686f6ed0/original/0adb8575-19f9-4103-afb2-951c82b7f58b-e7-icon.png',
      //       path: 'gs://this-is-central/local/dream/5cee0d3a0fe5f429686f6ed0/original/0adb8575-19f9-4103-afb2-951c82b7f58b-e7-icon.png',
      //       meta: {
      //         fieldname: 'images',
      //         originalname: 'e7-icon.png',
      //         encoding: '7bit',
      //         mimetype: 'image/png',
      //         destination: '/var/folders/8l/79bg9scd15g6rm97h2w3zk5m0000gn/T',
      //         filename: 'a95acb074eeb2417293572585aaaf57c',
      //         path: '/var/folders/8l/79bg9scd15g6rm97h2w3zk5m0000gn/T/a95acb074eeb2417293572585aaaf57c',
      //         size: 376012
      //       },
      //       gcs: [
      //         {
      //           _id: '5eabb5c53074950da43a3956',
      //           type: 'original',
      //           filename:
      //             'https://storage.googleapis.com/this-is-central/local/dream/5cee0d3a0fe5f429686f6ed0/original/0adb8575-19f9-4103-afb2-951c82b7f58b-e7-icon.png',
      //           gslink: 'gs://this-is-central/local/dream/5cee0d3a0fe5f429686f6ed0/original/0adb8575-19f9-4103-afb2-951c82b7f58b-e7-icon.png',
      //           bucket: 'this-is-central',
      //           key: 'local/dream/5cee0d3a0fe5f429686f6ed0/original/0adb8575-19f9-4103-afb2-951c82b7f58b-e7-icon.png',
      //           createdAt: '2020-05-01T05:38:13.230Z',
      //           updatedAt: '2020-05-01T05:38:13.230Z',
      //           __v: 0
      //         }
      //       ],
      //       __v: 0,
      //       createdAt: '2020-05-01T05:38:13.488Z',
      //       updatedAt: '2020-05-01T05:38:13.488Z'
      //     }
      //   ],
      //   date: '2020-05-01T05:38:13.483Z',
      //   caption: 'jpg png',
      //   achieved: false,
      //   deleted: false,
      //   createdAt: '2020-05-01T05:38:13.842Z',
      //   updatedAt: '2020-05-01T05:38:13.842Z',
      //   __v: 0,
      //   _id: '5eabb5c53074950da43a3961'
      // }
      return {
        statusCode: 200,
        body: {
          id, //
          userId,
          images: mapImages(images),
          date,
          caption,
          achieved,
          deleted,
          _id
        }
      }
    } catch (error) {
      log('error:', error)
      return {
        statusCode: error.code,
        body: error.message
      }
    }
  }
}
