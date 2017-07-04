const snakefetch = require('snekfetch')

exports.run = async function (client, msg) {
	msg.channel.startTyping()

	const avatarurl = (msg.mentions.users.size > 0 ? msg.mentions.users.first().displayAvatarURL : msg.author.displayAvatarURL).replace('gif', 'png')

	const data = await snakefetch
		.get('http://www.get-ur-me.me/api/flip')
		.set('Api-Key', 'XfGC62d9xKiOc4IegPdz')
		.set('data-src', avatarurl)

	if (data.status === 200) {
		msg.channel.send({
			files: [{
				name: 'dank.png',
				attachment: data.body
			}]
		})
		msg.channel.stopTyping()
	} else {
		msg.channel.send(`Error: ${data.text}`)
		msg.channel.stopTyping()
	}
	msg.channel.stopTyping()
}

