import click
import os

"""
$ pip3 install click
"""


@click.command()
@click.option('--count', default=1, help='Number of hello')
@click.option('--name', prompt='your name', help='Input your name here')
def hello_prompt(count, name):
	"""
	prompt option, user must input a option
	"""
	print('{} says:'.format(name))
	for i in range(count):
		click.echo('helloooooo world')


@click.command()
@click.option('--count', default=1, help='number of greetings')
@click.argument('name')
def hello(count, name):
	for x in range(count):
		click.echo('Hello {}!'.format(name))


@click.command()
@click.argument('says', nargs=-1)
@click.argument('name', nargs=1)
def hello_multiply_arg(says, name):
	"""
	Variadic Arguments
	If nargs is set to -1, then an unlimited number of arguments is accepted.
	"""
	print('{} says:'.format(name))
	for said in says:
		print(said)


@click.command()
@click.option('--options', '-op', default=2)
def default_option(options):
	"""
	Multi Value Options
	options number must equal nargs
	"""
	for option in range(options):
		print(option)


@click.command()
@click.option('--op', nargs=2)
def multi_options(op):
	"""
	Multi Value Options
	options number must equal nargs
	"""
	for option in op:
		print(option)
		

@click.command()
@click.option('--item', type=(int, str, int))
def tuple_option(item):
	"""
	Tuples as Multi Value Options
	options number must equal length of type
	options type must equal type
	"""
	for i in item:
		print(i)
		

@click.command()
@click.option('--message', '-m', multiple=True)
def multiple_options(message):
	"""
	receive multiple options, use like this:
		$ python3 clicker.py -m message1
		$ python3 clicker.py -m message1 -m message2
	**do not:**
		$ python3 clicker.py -m message1 message2
	"""
	for msg in message:
		print(msg)
		

@click.command()
@click.option('--happy/--no-happy', default=True)
def boolean_option(happy):
	"""
	--happy means True
	--no-happy means False
	"""
	if happy:
		print('happy')
	else:
		print('sad')
		

@click.command()
@click.option('--happy', is_flag=True)
def boolean_option_flag(happy):
	"""
	--happy means True
	--no-happy means False
	"""
	if happy:
		print('happy')
	else:
		print('sad')
		

@click.command()
@click.option('--site', '-s', type=click.Choice(['a', 'b', 'c']), default='a')
def choice_option(site):
	"""
	option value must be one of click.Choice(['a', 'b', 'c'])
	"""
	print(site)
	

@click.command()
@click.argument('name', default='ecmadao')
def arg_with_default(name):
	"""
	argument with default
	"""
	print(name)
	

@click.command()
@click.option('--name', '-n', prompt=True, default='ecmadao')
@click.option('--age', '-a', prompt=True, default=24)
def prompt_option(name, age):
	"""
	带有输入提示和默认值的option
	"""
	print('I am {}'.format(name))
	print('and {} years old'.format(age))


@click.command()
@click.option('--username', prompt=True,
			  default=lambda: os.environ.get('USER', ''))
def get_user_env(username):
	"""
	带有输入提示和默认值(调用函数)的option
	"""
	print("Hello,", username)
	

@click.command()
@click.option('--goods', prompt=True)
def goods(goods):
	"""
	带有输入提示的option
	"""
	print(goods)
	

@click.command()
@click.option('--password', prompt=True, hide_input=True,
              confirmation_prompt=True)
def password_option(password):
	"""
	密码输入
	"""
	click.echo('your password is {password}'.format(password=password))


def print_version(ctx, param, value):
	print(ctx)
	print(param)
	if not value or ctx.resilient_parsing:
		click.echo('Version 1.0000000000')
		return
	click.echo('Version 1.0')
	ctx.exit()

@click.command()
@click.option('--version', is_flag=True, callback=print_version,
			  expose_value=False, is_eager=True)
def callback_option():
	"""
	带有回调的option
	"""
	click.echo('Hello World!')


def abort_if_false(ctx, param, value):
	if not value:
		ctx.abort()

@click.command()
@click.option('--yes', is_flag=True, callback=abort_if_false,
							expose_value=False,
							prompt='Are you sure you want to drop the db?')
def dropdb():
	"""
	yes/no 选项的带有回调的option
	"""
	click.echo('Dropped all tables!')


if __name__ == '__main__':
	password_option()
