const servers = [
	'281482896265707520',
	'264445053596991498',
	'110373943822540800'
]
exports.run = function (client, msg, args, config) {
	if (servers.includes(msg.guild.id))
		return msg.channel.send('Sorry, Melmsie likes this server too much to let you spam.')

	if (client.ids.donors.donor5.concat(client.ids.donors.donor10).includes(msg.author.id)) {
		if (!args[0])
			return msg.reply('What do you want me to spam?')

		if (args.join(' ').length > 1900)
			return msg.channel.send('Too long.', { reply: msg.author })

		const intervalFunc = () => {
			msg.channel.send(args.join(' '))
		}
		const haha = setInterval(intervalFunc, 1250)
		setTimeout(function () { // eslint-disable-line prefer-arrow-callback
			clearInterval(haha)
		}, 30000)
	} else {
		return msg.channel.send('This is a donator only command! To gain access, you must donate $5 or more here: <https://www.patreon.com/melmsie>', { reply: msg.author })
	}
}
