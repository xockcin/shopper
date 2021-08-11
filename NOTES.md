# 7/21/21

I have been kicking this idea around in my head for a long time now. The time has come to sit down and bang it out. The plan is, I will build it so it works but is ugly - I will not waste any time at all getting hung up on how it should look. Then I will hand it off to my friend Megan, a newly-minted UX designer, who will figure out how it ought to look and feel, and then I will implement her changes, and then we will both use it as a portfolio project.

So here's how it goes. You just got back from the grocery story with a big long paper receipt. You want to enter your groceries into some sort of spreadsheet, but typing them all in along with all the prices and everything is just a lot of work and not that fun. You probably won't do it.

Enter Shopper (working title), an app that makes it easy and fun to itemize and keep track of your grocery shopping expenses. Choose which store you went to, then add each item with a single click of a button. You can also create new buttons if it's an item you've never bought before, adjust the price if the item was on sale etc., and so on. If it's a bulk item, you click the button and then enter the amount; if it's a nonbulk item, you just click it. Once you've entered all your items, you click a checkout button, and your receipt is recorded.

There's a lot more that you could do with this basic setup. You could, for instance, keep track of what's in your pantry, track usage and waste, get notified when you are running low on something, etc. But I will save all that for later iterations.

# 7/30/21

As is always the case, even building it ugly is hard. One especially tricky challenge is to make it so that the cart items organize themselves into like groups with a certain amount. Clicking on the cheese button three times should result in "3x Cheese," not "Cheese Cheese Cheese".

The simple behavior that we see when we interact with online shopping carts in fact represents a rather complex logic that I should probably pilfer from MS's excellent React class. You never get anywhere without standing on someone else's shoulders.

But I'm not just going to copy-paste it. If you're going to pilfer something, the least you can do is make a real effort to understand what your pilfering. I recall not fully understanding the code when I went through it the first time, so let's do that now.

It's two files. The first, "cart-context", is just that - a context, created by React.createContext(). I am still shaky on the details of what this function does, but the details aren't important. What matters is what I do know: It takes as a parameter an object that will constitute the shared state of whatever components partake of it. And it returns a "context," about which we will say more later.

This particular context-creating function takes as its argument an object with four named properties: an array, a number, and two functions. The array is empty, the number is zero, and the functions are empty. It is an extremely minimal piece of information. This is important to remember: the actual createContext() function does very little. It just *creates* the context. It doesn't really *do* anything with it.

And I just remembered something really crucial, which I forgot until just now, which is that a context is a *component*. Its first letter is capitalized. It is a component. Specifically, it is a *wrapper* component. Its job is to wrap around other components in order to provide them with the context, using the <Context.Provider> syntax.

In that spirit, let's dive into CartProvider.

Starting at the bottom, with the return statement. We are indeed returning a context provider, namely the context we imported from the "cart-context" file. We are passing props.children into it, like you do. And, most importantly, we are providing it with one single prop, "value", set to the variable "cartContext" - note the lowercase first letter. This is NOT the component we have imported from our "cart-context" file. It is something else.

What it is is an object that bears a striking resemblance to the object we passed into our createContext() function, with an array of items, a total, an add item function and a remove item function. The first two are properties of an object called cartState, and the last two are functions. All are declared earlier in this functional component, called CartProvider, that we are in.

Now it's time to talk about useReducer, which appears at the beginning of the CartProvider function. It takes two arguments, a reducer function and a default state, and returns a two-item array containing the current state and a function to dispatch actions to the reducer. Woof! But the thing is, you just have to hear the words "reducer" and "dispatch" over and over, and eventually it starts to make sense.

Let's jump up to the reducer function, because that's where the real meat is. This reducer, as written, is a big and rather ungainly cluster of if/else statements. But let's go through it, and maybe we can even refactor it as we go.

The first thing to notice is that the function takes two arguments, a state and an action. A state is just an object and an action is also just an object. Specifically, in this case a state is an object with two properties: items, which is an array; and total amount, which is a number. And an action is also an object with two properties: type, which is a string, and payload, which is an item (i.e. object) in the case of "ADD", and an id (i.e. a number) in the case of "REMOVE". If you want to add an item, you need to add the whole item; but if you want to remove an item, you just need to know its id.

Ok, let's suppose we dispatch an "ADD" action to our reducer. What happens?

First, let's talk about the shape of the "item" object, which I have not pilfered for this app yet but probably will later. It has four properties: id (a number), name (a string), amount (a number), and price (a number).

So, when we dispatch an "ADD" action, the first thing that happens is that we declare a variable called "updatedTotalAmount", which is just that. It's just the current total amount plus the item price times the item amount.

Then we do a bit of trickery to find out if the item we are adding to the cart is already in the cart, like so: First, declare a variable called existingCartItemIndex, which calls the findIndex method on the array of existing items to find if there is an item within it whose id matches the id of the item we are trying to add. 

The findIndex array method takes a function that goes through the array and tries to match every item. If it finds a match, it returns the index of the match. If it can't find a match, it returns -1.

So we have this variable called existingCartItemIndex, which is either a valid index (i.e. a number from zero on up) or -1, which is not a valid index. This is actually a great teachable moment about the difference between JavaScript and Python, because in Python, -1 *is* a valid index, and what we are about to do would emphatically not work.

So anyway, we have this variable called existingCartItemIndex, which is either a valid index or -1. What we do next is we declare another variable called existingCartItem (no Index), which is simply the item at the, if you like, existingCartItemIndex-th index of the items array that constitutes the centerpiece of our state.

This is a classic bit of JavaScript cleverness. Because if existingCartItemIndex is a valid index, it will return an item, and if not, it will return undefined, which is falsy and can therefore be used, as we will in a moment, in a conditional statement.

Finally, we declare two variables using the "let" keyword, which is a somewhat unusual sight in modern functional JavaScript but still certainly has its uses, as we shall see.

So now we have an if/else statement using that variable existingCartItem, which might be an item (i.e. an object) and might be undefined. So if it's an item, that means the item we are trying to add already exists in the cart, and instead of adding it per se, we need to update the amount. And what we do in that case is set the updatedItem variable (which is NOT a const), using the spread operator, to an object that is equivalent to the existingCartItem object from earlier, with the amount property updated by taking the sum of the action item amount and the existing item amount. After we do that, we first set the updatedItems variable, also using the spread operator, equal to the current items array, and then set the item we are trying to update, using the existingCartItemIndex from earlier, to the updatedItem that we made above.

So much for if the item is in the cart already. But if it's NOT, then it's a bit simpler. First we set updatedItem to the item we are passing in, and then setting updatedItems equal to the current items array with the new item concat-ed on. Of these two, I believe the first one may be unnecessary. Recall that this is someone else's code, and even the great MS makes mistakes sometimes.

So after that if/else statement, we are left with one variable: the updatedItems, which is either our previous array with a new item added on, or our previous array with an existing item updated. We then return an object - the new state - which, like the old state, has two properties: a new array of items and a new total amount.

And that's how you add an item! Now let's look at how you remove an item.

A lot is the same, or at least similar. This time we start by finding the existingCartItemIndex, in more or less the same way, except that this time our payload is just the id rather than the whole item. Next we get the item with the index. This time it's called "existingItem" - inconsistent, but that's ok. And this time, we know it's going to exist, because you can't remove an item that doesn't exist. Then we get updatedTotalAmount, with a minus instead of a plus, and no times because you can add items up to five at a time but remove them only one at a time.

Now we will declare updatedItems, again with let, and then get into an if/else statement.

This if/else statement is different from the one before. When we were adding items, we needed to know if this item already existed in the cart, in order to know whether to add the item to the list or to update the amount of the existing item. This time, we need to know something related but different: we need to know whether or not the amount of the item is equal to 1. If it's 1, we will remove it, and if it's more than 1, we will update the amount. Then we will return the new state, just as above.

My god! What seems simple and effortless to the user is so complicated for the developer. But still, I do understand this code, and am perfectly capable of writing something like this.

There are a couple of things I want to drill down into about this particular example. Particularly I want to focus on findIndex and let. The reason we use let is, in both branches of the reducer function, so we can set the value of updatedItems in two steps: the first one sets it equal to the previous item array, and the second updates a specific value of that array. This is a difficult thing to do in one step.

If I may, I would like to dwell on this a little.

Let's think: could we do this another way, without findIndex and let?

Our items are stored in an array. Maybe there could be another way of doing it, but let's keep it like that for now. Each item is an object, with an id, a name, a price and an amount. We receive a new item, which has all those just-mentioned properties.

The tricky thing is that we are working with an array, in which items are stored in a certain order, but there is no way to predict that order. The order in which the items are stored in the array is determined entirely by the whims of the user. So we don't know where any given item is going to be in the array, but it matters.

Modern JavaScript developers love the elegance of a one-liner, and feel like indexing into arrays with actual numerical indices is a relic of the C era. But in the face of such uncertainty as that of user-whim, we sometimes must reach for somewhat antique weapons.

Very well. Now I understand fully and completely how this component works. It only took me roughly two hours! Now let's take a quick look at how it's implemented in MS's app, and then see about adding it to mine.

It's not so complicated. First of all, it wraps the whole app, which means all the components in the app will have access to the context - which, let's recall, simply means the contents of the cart (an array of objects), the total of the cart (a number determined by that array of objects), and two functions, one to add items and another to remove them.

So let's look at the Cart component, for instance. It starts by getting the context using the wonderful useContext() hook. Then it extracts from that context the total amount, which is a number, and whether or not the cart has items, which is a Boolean. Then we declare two handlers, one to remove an item and the other to add an item. These are just wrappers around the functions in the context, which both lead eventually to the big reducer that we just discussed.

Then we create our cartItem list by mapping over the array of items and creating a <ul> element. The only thing I don't understand right now is the use of "bind" when passing the add and remove functions into the cartItem (which is another, purely presentational, component). I'll look into that right now and get back.

After about 90 seconds, I'm not sure I can explain it as thoroughly as I have the rest of this application. All I can say is that it has to do with scope. It may not be worth digging into just yet.

My job now is to replicate this logic, in a somewhat limited form, in my app. The first thing I should do, though, is separate out the components.

While separating out the ItemList component, I realized that I'm not going to get very far if I don't start using my context as soon as possible. The context is the cart, and the cart is the app, so let's get that up and running ASAP.

In fact, I think the best idea at this point would be to clear out my App component and start over. I'll keep my ItemList and ItemForm components, but I need to rebuild the whole thing with the CartProvider in mind. Let's do that.

OK, everything is gone now. All that's left are the two columns that constitute my minimal design. The left column will contain the items you can select from, the right will contain the cart.

Now I have wrapped the whole app in the CartProvider component. That way the items column will be able to add to it and the cart component will show it. Note that we are not *using* the context here yet - we are just *providing* it. We will use it next.

Now let's go to ItemList. This is a very simple component that contains the dummy data we are using for our app. Here, each item just has a list and a price, no id. Let's change that - let's give it an id.

OK, now they all have id's, which are just numbers.

OK, now there is a handleAddToCart function attached to the button. It's simpler than the one in MS's app, because I'm not worrying about amount. You can only add items one at a time.

Now let's do the cart.

Ok, now it works. Super ugly, but it does exactly what I would like it to do.

Now the next challenge is to make the form work, which will be tricky, as MS himself has indicated. I think the thing to do will probably be to watch his lesson on forms, and why they're tricky, before I try to implement my own form.

# 8/4/21

I'm getting to a point where I really want to get this done. The next thing I need to do is make it so you can add items with the form. No validation or anything.

But here's the thing: If you can add items to the market, then market items are now part of the state, and there's a lot more I have to do than just make the form work. Ideally, what I should do is hook it up to a backend, but I will start just by creating a context.

The first thing I did was to copy and paste cart-context.js into a new file called market-context.js, which will be similar but not the same. The market context does not need a total value, just an item array and methods for adding and removing items. Then I will model the Market Provider on the Cart Provider.

It's going well so far, but I just realized that I'm going to end up with two provider wrappers. I don't want to end up in the Wrapper Valley of Doom! I suppose that's one reason why people use Redux.

Now it works!

Now I should be able to remove the item from the market list. Ultimately the best solution would be to let people edit the item, or be able to select from multiple possible prices, but I can do that later.

Ok, now the tricky thing is that, if I'm going to remove the market items, then they need to have ids. The hard-coded ones have ids, of course, but if I'm going to make it so that people can add their own custom items, I'll need to add a feature to give the items ids automatically.

Actually, I'm thinking it might be easier to just go ahead and implement market item editing.

So what that would look like is another form, like the ItemAdd form (which, I should call it that, now that there will be two item forms), which will appear in the space of the item when you click the edit button.

I suppose the best way to do it would be simply to add another action type to my reducer.

I'm realizing this is actually kind of tricky. Because what the action creator needs to do is return a new version of the items array with one of its values updated. The best way might be with map. But I also need to figure out what sort of payload I'm passing into the function. All surprisingly complicated!

And for something that is not a core feature. I have barely even begun to think about the actual meat of the project, which is the part when you save use the data contained in the itemized receipts. I need to take a break - will come back to this sometime soon.

# 8/11/21

It's been a week - seems like an eternity. This app can already do most of the basics. You can add an item. You can't delete an item, but then again why would you want to? There's no backend yet, but that's okay. You can both add and subtract items to and from the cart. That's pretty much it. No pictures. It doesn't look nice it all, but that can come later. You can't edit an item, which is kind of a problem and something I should implement, but you know, whatever.

The main thing I need, of course, is a backend. I still feel sort of terrified of Node after the woefully inadequate preparation I received in the final four weeks of my bootcamp, but that's dumb. I need to bite the bullet and get on with it. As I have become fond of saying - what would a crazy person do?

My plan for getting backend programming to click for me is a bit odd - I want to build a project for Arduino using aWOT, a library for hosting a RESTful server on an Arduino, modeled on Express. Perhaps not that useful - the pros all say that the Arduino platform itself is only for novices and hobbyists, of which I admittedly am one. But that will be a project for another repo - namely Link-n-Load, which I created last week and is still empty.

For now, I think the next step on this project is to create a separate screen in which the user can view their purchased items. First it will just be receipts, but later it can expand into other views. Views, that's the word - I need to make views.

But before I do that, I should go back to that Udemy course and review React Router.