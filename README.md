# shopper: keep track of groceries

## Purpose
The purpose of this app is to help you keep track of what groceries you buy.

## Problem
Most supermarkets still can only issue paper receipts. The question of how to get the information from the receipt into your computer in a useful form is surprisingly tricky. Obviously, you can just type it up, but that's too much work. Using a computer vision algorithm to convert a picture of the receipt into text is too complicated, unreliable and not even that helpful.

I think the easiest way to do it would be to present the user with a simple button-based interface of items they buy often, with a form for adding new items.

There are two types of items, bulk and nonbulk. To add a nonbulk item to your cart, you just click it. To add a bulk item, you click it and then enter the amount. To add an item button to the list of potential items, you enter the name of the item, whether or not it's bulk, the price if it's nonbulk, and the price per pound if it's bulk. It should also have a picture.

The best way to make this app will be with React.
