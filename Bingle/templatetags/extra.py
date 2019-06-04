from django import template
from Bingle import issue
register = template.Library()

@register.inclusion_tag(filename='c-nav.html')
def get_menu():
    return {'levels':issue.getLevels()}
