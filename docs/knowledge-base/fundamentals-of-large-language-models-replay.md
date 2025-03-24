# Fundamentals of large language models - replay — Webinar — Onepoint TechTalk - Onepoint - Do data better | Innovate with AI & more | Architect for Outcomes

Source: https://www.onepointltd.com/techtalk/fundamentals-of-large-language-models-replay

_Onepoint - Our experience helps to solve questions related to on-prem or cloud; data strategy or governance; data engineering or analysis, delivering the best possible outcomes. Doing data better._

## Content

- Do data better
- Innovate with AI & more
- Architect for Outcomes

- Search for:Search

Do data better[1]

Innovate with AI & more[2]

Architect for Outcomes[3]

Home[4]

Onepoint Techtalk[5]

## Fundamentals of Large Language Models

Welcome to the first webinar in our series aimed at demystifying artificial intelligence. In this kickoff session, we look at the fundamentals of Generative AI and Large Language Models (LLMs) — one of the most transformative AI technologies to emerge in recent years.

This event was livestreamed and recorded

This primer will equip you with a foundational understanding of how LLMs like ChatGPT work under the hood.

In future sessions we’ll build on what’s covered here and get into more advanced concepts and technical details.

- What is Generative AI and how does it work?
- How are LLMs constructed and trained?
- What are the key capabilities and limitations of LLMs?
- Why does this matter (why should I care)?

Garima Dosi (Moderator):

Good morning, good afternoon, good evening to one and all. A very warm welcome to Onepoint TechTalk. I’m your host, Garima Dosi, an Architect here at Onepoint. And about Onepoint, it is a boutique values-driven, business-oriented technology consultancy. We architect prototype, build and manage data and AI powered solutions. We also partner with global clients looking for high impact enterprise grade advice and IT services to realize their most critical digital transformations.

So today we are here excited to start with the concept of roots to fruits where we learn a technical topic similar to how a tree grows. A tree grows by establishing its roots and then growing into the trunk with varieties of branches and interesting leaves, and finally bearing the fruits, which the whole world can see, use and experience. And this journey has been shown on this slide. A technical topic could be similarly learned, starting with the basics, and then growing into the ecosystem, the frameworks, and then finally, how to use those frameworks in ecosystem to get good products and services out of the whole concept. Under this new concept, it is the first technical webinar series today, focusing on the topic Decoding AI and hence the name ‘From Roots to Fruits – Decoding AI’.

Joining me today is my colleague and your presenter, Gil Fernandes. Gil is an AI Architect and experienced AI Solutions Engineer, and a go-to expert here at Onepoint. AI as we all know, is a widespread area of research and applications, and it has got many components. And in this AI series, we are going to specifically delve into Large Language Models, also popularly known as LLMs. We’ll start with the roots of LLMs to reaping the fruits of LLMs and as the series or the Tree of Learning grows, we will also visit various leaves like creating workflows and agents and frameworks in the upcoming sessions.

Before we start, I would also like to inform you that there will be a Q&A session at the end. So please be generous in posting your questions throughout the session. Without further delay, I now invite Gil to help us understand the Fundamentals of Large Language Models or LLMs.

Over to you, Gil.

Gil Fernandes (Speaker):

Thank you very much, Garima. Thank you for this introduction. This is today’s agenda. We’ll first talk about the importance of Large Language Models, then we will dive into the essence of Large Language Models. Large Language Models are neural networks, so we will try to understand what are essentially neural networks. Then we will also try to understand how Large Language Models look at the world, at their input at words. We’ll also be talking about the fundamental architecture behind Large Language Models. It’s a new network architecture called the Transformers. We will also talk about the Large Language Model and understand how Large Language Models are trained. We’ll also be talking about some of the most commonly used Large Language Models and how you can compare them.

Then we’ll touch on the topic of Artificial General Intelligence. Finally, we will also be talking about the shortcomings of Large Language Models. Large Language Models are amazing, but they are not perfect, so they have some flaws. We will also be talking about these shortcomings.

Okay, so let’s start.

Why should I care? Why are Large Language Models important these days? Lots of important software vendors have started to include Large Language Models, integrate Large Language Models into their product offerings. These big names include Zoom, Adobe, and definitely also one of the biggest players in the software world, which is Microsoft. Microsoft is launching new Windows versions with new capabilities, and most of these new capabilities are based on Large Language Models like Microsoft Recall, just an example.

Then there are lots of startups which emerged recently. They include Character AI, for example, or obviously OpenAI is also there, Claude and many others which are startups, which base their service offering on Large Language Models.

Also, the hardware vendors have started to deliver some extensions like neural engines, which are conceived to speed up the execution of Large Language Models.

These newly delivered processors include the Snapdragon X Elite, which is not fully out there yet, but it has been announced multiple times. Apple has the M3 neural engine, which is also designed to speed up all the computations performed by neural by Large Language Models. So here you can see some examples of these new, software offerings which just appeared like two years ago. They include products like Midjourney, Character AI, like I mentioned, Gemini, et cetera.

You can see that there is a new software ecosystem which emerged due to Large Language Models. And last but not least, also the world of robotics is being influenced by Large Language Models. Just to give you an example, Figure AI is a robot that is integrated with ChatGPT.

I would like now to start our audience poll. Can we please just have a quick look at it? The question is, what is the primary purpose of your GenAI usage? GenAI means Generative AI usage. What are you doing with Generative AI? So please go ahead and let us know what kind of GenAI tools you are using, it can be many things. And also the purposes for which you are using these tools. I’ll continue in the meantime.

Large Language Models are also affecting the academic and also the educational world, schools, et cetera. Students have started to use it for lots of purposes and it has an impact in the younger generation. I think there are two main effects of Large Language Models in education. The first effect is that Large Language Models are being used as tutors, that is mostly a positive thing, they act like a private tutor but sometimes they are also a source of plagiarism. Students are using Large Language Models to write their homework or their essays, and that is something which is not very good. They are very, very capable. They can deal very well with the homework questions like the one here, what is the derivative of some function? Mostly they solve these types of questions correctly, and they even give you a very thorough explanation.

So yes, they are really capable of solving your homework, but that’s not very good.

Large Language Models are also quite important in terms of their impact in the corporate world. Right now, there is a lot going on in terms of experimentation our CEOs, CTOs are thinking about how to use Large Language Models, integrate them into their business propositions. There’s a lot of thinking going on right now at this moment. There are lots of positive expectations, but also some fears regarding Large Language Models and Multimodal Large Language Models. There is a lot going on in terms of business thinking related to this topic. But they are also being used by employees to enhance corporate communications.

Large Language Models are being used to generate summarise, translate, improve, correct et cetera lots of the texts which are being written in the enterprise world and employees and not only employees, but many people in enterprises are also using chatbots, which are powered by Large Language Models in the enterprise chatbots which are integrated into enterprise software. Large Language Models allow for a higher degree of automation in many tasks. you can, for example, summarize texts these days in a very quick way with Large Language Models. And hence they allow more automation to be done, this will have sooner or later an impact on the job market. More automation means also that there is a transformation in the job market.

Now, I would like to go back to our poll and just see how you answered this question. What is the primary purpose of your generative AI usage? So, it seems that most people use it mostly for work or professional projects. It seems that it is really correct, this assumption that AI is being used in the corporate world like what we had in previous slides. To enhance corporate communications, most probably, I guess then also for learning or academic studies. This is this idea of AI or large language model as a tutor or MLLM as a tutor. When I talk about MLLM, I’m talking about Multimodal Large Language Model, and these are Large Language Models which also understand images and deal with images and sometimes even videos. The third question which is relevant is for personal assistance or productivity, which is also related a little bit to the first one.

So yes, our audience is really using Generative AI to support them in their work or learning activities as far as I can tell. Thank you very much.

Let’s move a bit away from the impacts and importance of Large Language Models. Let’s talk a little bit about the fundamentals of what they really are. The question is what are exactly Large Language Models? And the answer is, this is like a very straightforward answer. They are neural networks, and of course you’ll ask me, okay but can you please explain a little bit what are neural networks? Large Language Models are deep neural networks. So that would be a more correct answer to this question. Deep actually means that Large Language Models are neural networks with more than one hidden layer.

You can see here a picture of a neural network, and you can already see some elements of a neural network. Neural networks typically have an input. Typically, it is denoted by x, it’s like the input variables, and they have an output. They are really functions like in the mathematical sense, it’s like input output. They are analogue to mathematical functions where you have an input, and you have an output. Then the third important thing about mathematical functions are the parameters. Here you have an example of a very simple function. It is just y equals a plus b multiplied by x, and y is the result. The output a and b are both parameters. They need to be kind of configured, and x is actually the input. Neural networks have these three elements, input, parameters and output, but they have also hidden layers. These layers of computation with neurons and these neurons are mathematical functions analogue to the neurons in our brain, which receive an input, process something and produce an output. And this output is normally chained into another neuron or in the case of the last layer, just chain into the output.

Neural networks can be trained, and neural networks typically have a large number of parameters compared to a normal function. They have two states. They have a state in which they are non-trained. And this was what this picture here was about. In this case, this neural network is not trained, so it doesn’t know about the space of the blue dots and the yellow dots. But after training, you’ll see that this neural network knows about the space of the blue dots and knows about the space of the yellow dots. So neural networks can be trained, and by training, I mean the parameters can be configured so that it gains knowledge about the world.

Let’s look at the training neural networks, are mathematical functions, like we said, with input, output and parameters, and they learn from specific data sets. What does learning actually mean? Learning means fine tuning the parameters. Neural networks learn from specific datasets, and they are able to self-discover the rules related to a specific problem. And they discover these rules during training and discovering the rules means they’re able to fine tune the parameters so that the parameters in a specific configuration reflect those rules. Neural networks are amazing because they have the capacity to discover complex rules, and the bigger the model is, the more rules they can infer from data sets. Size in a sense actually matters if you want to have a very, very capable neural network with lots of features, we’ll probably have lots of hidden layers and also lots of parameters so growth has some kind of effect in terms of the power of a neural network.

What are the key components for training?  The first thing is a network structure, you need to define your mathematical function. What are the parts of this mathematical function? How many layers it has, for example, you need to define. And what are the neurons doing in each of these layers are kind of mathematical function they embody in these layers. For example, what is the input data you need also to define somehow into network extraction and also what is the output?

Then you need to select an appropriate data set so if you want to perform image classification tasks, obviously your dataset has to be images, and they also have something very important, which is the loss function. The loss function is a kind of a verification strategy or mechanism which allows to say how far off a prediction is from the real result. And the result of the loss function is used then to fine tune the parameters in the neural network. The loss function is only used obviously during training, and it’s not used when you are just inferring results, you are performing inference with the neural network. Loss function is really important for the training, but then it’s not used after that.

Finally, there is the training process, during the training process, you look multiple times through your data, and at each epoch, hopefully the loss is diminishing, and the network then approaches a specific state in which it can’t learn anymore. At this stage, typically you stop the training. These are the key components for the training.  A network structure appropriate to your problem, an appropriate data set, matching your requirements then appropriate loss function, which helps the network to learn to fine tune the parameters. And finally, you need to loop a couple of times till the network stops learning, then the network has learned. You can start using the trained neural network. And when you start using it, we talk about inference, its inference time, we can then use it.

What can neural networks do? We know that Large Language Models are neural networks, but neural networks are more than just Large Language Models. They can solve many, many problems in many families, many areas. They can solve problems like image classification and segmentation. Segmentation is about recognizing parts in pictures, it is about recognizing, for example, if there is a tree in a picture and where the tree is located or it’s capable of locating cars or human beings in the picture or the dust bin, you can recognize where the dust bin is. It’s simply that the dustbin is in the middle of this picture here, it was recognized. This image here is about image segmentation. They can recognize handwritten characters, and they can also perform lots of NLP tasks, Natural Language Processing tasks like summarization, keyword extraction and translation.

They can even do sometimes very crazy things like, writing morse code. If you want, you can try that out with some Large Language Models. But there are lots of Natural Language Processing tasks. We will talk about Natural Language Processing tasks in our next webinar, more in detail. They’re also keeping capable of performing video labelling tasks, this is about describing what happens in a video. They’re also capable of image labelling and speech recognition and transcription. Image labelling is about describing the content of an image, here you can see in this picture that you have a bird, and then it goes through an encoder and a decoder. These are parts of the neural network, and then this little image gets converted into text, then you get out a response, you get out some tokens, this is bird or this is a bird. And then you can also reverse the input and output. You can also have neural networks which understand language and generate pictures. And there are a couple of commercial offerings based on this idea, like Midjourney, for example.

They’re also capable of performing very scientific tasks like protein folding. They can convert graphs of amino acids into 3D structures, this is very useful in the field of biology. It’s a very complex task actually and scientists have been working on this for decades. And neural networks, guess what? They can predict this extremely well. There is a system called AlphaFold and these two pictures are from AlphaFold. AlphaFold is now in its third incarnation and it achieves actually amazing results in terms of guessing the 3D structures of protein. As you can see neural networks are extremely versatile.

Now another very interesting question is about how Large Language Models actually see the world or see their world, which is how do they perceive words? I think this will be quite surprising for some of you. First of all, let’s talk about the datasets that they are used for training, but then we’ll talk about the specifics of how they actually ingest words. Normally, Large Language Models are trained with large amounts of data, including the Common Crawl Dataset, which is a huge dataset with the content of the internet. It’s really terabytes of data. They also use the data of code repositories like GitHub, very useful if they want to learn how to code. Then also they use other datasets like open sourced books and Wikipedia. They use a mix of free data these days, but also commercial data. There are commercial data providers like Reddit. Reddit is a social network which now has I think some deals with the OpenAI. They are selling their data now to OpenAI and the Wall Street Journal is another example. The data sources for Large Language Models are either kind of open source and free or they are commercial sources.

We know that they consume text, but we wanted to talk about how they actually consume this text. Do they really see words or not? They consume words, that’s for sure. But the truth is, Large Language Models never really see words. Let me explain why, Large Language Models they don’t come alone. They are not just models into which you can actually just push a word and they will produce a word. It’s not like this. They come with a tokenizer. This tokenizer prepares a token sequence, it converts from raw text, it converts sentences into tokens, and then it produces a sequence like a list of tokens. And then this list of tokens is what is actually pushed into the large language model. Then the Large Language Model will do its own thing. It’ll process these tokens and it’ll produce also a token sequence. This token sequence is then sent to this tokenizer and this tokenizer then will assemble the words and sentences, all of them together. The truth is Large Language Models, they don’t see words, they don’t even see characters. Another possibility would be to create a Large Language Model, which consumes also characters, single characters like A, B, C, D. This would be also another possibility, but no one does this because of the computational costs.

Let’s try to understand this a little bit better. LLMs, they process tokens. They don’t process words really, very important to note that. Here is an example, this sentence, they are splashing gets converted into four tokens, and the tokens look like they are, but are contains a space. So, space is not the separate token it gets kind of included into a combined token. It is space R and space SPL, it’s another token and ashing. You can see here that three words became four tokens. These tokens also seem to contain space. If you want to play around with tokenizers you can do this on the web here, you have two

web addresses where you just can play there and just see how your sentences get tokenized. And these are a couple of rules about how words are expanded into tokens. Normally, 75 words correspond to a 100 tokens in English. And like I said, it’s a form of compression. If you look at the case that you want to process every single sentence. If you try to train Large Language Models with single characters, then the computational cost is extremely expensive. Many researchers decided to use tokenizers to compress multiple characters into tokens.

What are the consequences of all of this? Now we know that Large Language Models, they don’t see words, they see tokens. This has some consequences; they are notoriously bad at counting words. Counting words is very challenging for them, prompts like how many words are in the response to this prompt? They normally give you inaccurate answers. And the reason for this is exactly that, Large Language Models, they consume tokens, and they produce tokens.

There are other types of prompts which also don’t work very well, and these are prompts that rely on the concept of word. I can give you another example. Can you please write ten sentences to me which end in apple pie. You are relying on the concept of word and forcing the model to generate something on the concept of word, and they don’t react very well to these types of prompts. Important to note this, but note we’ll talk more about Large Language Model shortcomings later on.

These tokens, they are not directly consumed. They are converted to numbers using an internal vocabulary dictionary which is also contained in the Large Language Model. The Large Language Model comes with the tokenizer, and it also comes with an internal dictionary. It has knowledge about tokens, and this is saved or persisted in the vocabulary. And this vocabulary has numerical indices. The tokens get converted to numbers with the help of this vocabulary dictionary. Here you can’t see it but that’s what happens a token becomes a number, really. Then these numbers get converted into vectors, into high dimensional vectors. What are high dimensional vectors? High dimensional vectors look like lists of real numbers, but they represent positions in multi-dimensional space. Our physical world is three dimensional, right? I have three coordinates and we position objects in this three-dimensional space. But now you could also have a fourth dimension, a fifth dimension, a sixth dimension, a seventh, and so on. You could go up to thousand dimensions and if you go to thousandth dimension, we talk about this high dimensional space. These tokens get indirectly converted into positions in multidimensional high dimensional space. And what happens here that tokens become geometrical reality in a sense, and you can convert words into vectors, but you can also convert whole sentences into vectors using neural networks and you can also convert images into vectors. You can convert videos into vectors. You can also convert graph structures like amino acid structures into vectors. You can convert everything into these points in this multidimensional space.

This allows us to use a new type of database, which is called the vector database. Now, I know today’s topic is not vector databases, but we’ll have another webinar which we’ll be talking about, vector databases which allow to implement very interesting business ideas around recommendation systems or around search engines or multimodal search engines. But there are a lot of applications for this vector databases. I just wanted to mention really that Large Language Models, they have geometrical representation of tokens in a multidimensional space, and that you can take these representations and then put them in a specific type of database and then you can create applications. You can create whole, or you can implement whole business ideas just using these vector databases. It’s very interesting topic, but it’s a topic for the future.

This is the whole process. The words get converted into tokens. Tokens are mapped to numbers. Numbers are mapped to vectors, and vectors are positions in high-dimensional space. And finally, these vectors, all whatever numbers are inside of the vectors, they are changed. They are fine-tuned during training. Vectors tend to align during training. You can see before the training, the vectors are not aligned, and after training, they seem to align in this multidimensional space.

Now you understood, how Large Language Models understand words. Let’s talk a little bit about the underlying architecture of the neural network, which is the basis

of the Large Language Model. The architecture which allowed this new wave of Large Language Model is called the transformer architecture. And it’s based on a seminal paper. Attention is all in need from 2017, created by Google researchers, and it was published primarily to solve one problem, which was the problem of translating from one language to another, hence also the name transformer. They wanted to have better systems for I think Google Translate, and they were looking for a more scalable solution.

What are the plus points or what are the advantages of this architecture? The advantage is really that it can scale very well. It can paralyze computation on sequences, and thus allows for new networks to get bigger and maintain their performance. They allow significantly more parallelisation. And this allows to add more layers to your network. Like what we, talked before, when you have more layers, when you can increase the size of your neural network and it still performance, it still works, then the new network becomes more capable of inferring more business rules. It’s you can increase the capacity, the kind of, skills of the neural network. This was fundamental. This is an architecture which superseded the recurrent neural networks, which were also very powerful, but they were hard to scale. This is the big advantage.

Then there is also another, aspect of this transformer architecture, which is the self-attention layer, which allows really to find out what is more relevant in these sequences. This specific kind of node let’s say, in this transformer architecture, it gives you, a measure of relatedness of one word to other words. It creates a matrix. And you can always tell with this matrix that a word is related to some words and not related to others. It’s called the self-attention layer. And it is applied on all these hidden layers of the neural network. Its function, it’s just about calculating interrelations of words, token, it’s not words really. It’s tokens in a sequence. This layer deals with representations of tokens and not really with the words. It’s important to note that it’s a formula for assessing word relationships, and this is inbuilt into the whole architecture.

We are going also now to touch on the topic of Large Language Model training. Because the way Large Language Models are trained, they explain also a lot about their behaviour, and they help also us to understand a little bit better why they work the way they work. There are three training phases, and the first training phase is just learning about language, learning about concepts, learning about our world. That’s the first phase. The second phase is the phase in which the model learns lots of skills. It can learn skills which are related to chat or, skills which are related to instructions and to following instructions. It’s called very often also instruction tuning phase. And there is a third phase in which the model is adapted to human behaviour and human preferences.

In the first phase, the model is just consuming a huge amount of text. Now you can see this image over here, and this image it’s the image of a transformer. This is related to the transformer movie, but that’s the same name of this architecture. The transformer is basically just consuming a lot of text, so it has to go through a lot of text and then, then guess lots of words in this training phase. The objective is, like I said, understanding language, understanding concepts, understanding about the world, and the training data is lots and lots and lots of text. And, in the training process, researchers just get a lot of text and remove some words here and there randomly, and let the model guess these words, and then they fine tune the model on this task. This is called semi-supervised learning, and it’s very resource intensive, because the models have to be trained, the models are typically also very large, and they have to consume a huge amount of data.

In the second phase, models learn about specific skills, and the data sets look a little bit like this one. Typically, these data sets have a question and a response, and sometimes they also have like a system prompt. And the system prompt is about setting some kind of context. And the models are trained in this phase to learn how to summarize text, how to translate text, how to extract keywords. There are many tasks which are trained here. Some models are more trained to be chat models, the questions are more intended to emulate a chat process. And some other models typically are more trained to follow instructions. Very often what you find in fine-tuned models, you find models with the name instruct or chat. And this is related to this instruction tuning phase. Some models are better at chatting, they normally have in the name something with chat or instruction following than they have something with instruct in their names. So that you know this, these names have indirectly connection to this training phase.

Finally, the last training phase is about reinforcement learning from human feedback, which is a mouthful. But what does this mean? This means researchers try to adapt the model to some human behaviour. And how does this work? The models are made to answer lots of questions, and for each question they give multiple answers. Then these answers are ranked by the human team. All these rankings, they are fed into reinforcement learning. This is a separate model, it is a reward model, which is then trained with, rankings produced by this, human team. And when this reward model has been fully trained, then this model is used to train the Large Language Model. Then this model disappears from the scene, and the result is the Large Language Model, which is now adapted to the preferences of a human team. Now, if this human team has some bias towards a specific human behaviour, this bias will be baked into the Large Language Model. If the human team, for example, prefers confidence over accuracy, the Large Language Model will also learn that, and will start also behaving that way. Will give you confident sounding answers, but not very accurate. There are a couple of problems with this training phase too. You can induce this problem. It depends a lot on the behaviour of the human team.

Now, I would like to ask, our audience about which GenAI tools do you use regularly, at least twice a week, and then you have here some of the Large Language Models, the commercial ones, and non-commercial ones.

I will continue here. These are the most prominent Large Language Models. In 2024, we have ChatGPT 4.0. In this, GPT, O incarnation omni model, which is still considered to be one of the most advanced models, if not the most advanced one, and still has the best performance according to the chat arena leaderboard. We have Gemini, which is the big competitor, the Google competitor, both are closed source models and Gemini, came a little bit to prominence after ChatGPT. And like I said, it’s a Google product, whereas OpenAI is more like a startup. Gemini is good at processing multi-model input, but so is right now ChatGPT is also very good at that. It has really extended memory set, has a very large, context window, which means it can process lots of text at once in one single prompt. And we have also, Claude, an offspring let’s say so was also founded by ex-members of OpenAI. It’s very good at creative writing is very competitive too and also has a very large context window. All these three models, they’re all closed source. We don’t know how they were trained. We don’t know the training data. We also don’t know the weights of the models and weights mean we don’t know how the parameters are configured. There are also no real papers about them.

These three models here are semi open source or fully open source. Llama 3 is the model, which was I think completely open source under a very permissive license. We know about the parameters of this model. It was the best open-source model according to chat bot arena last month. But now I need to look where it stands. It is comparatively small model, but it’s very, very competitive and it’s used by Facebook because it was backed by Meta. Then you have Mistral, which is a French company, and Mistral is semi open source. They have a large model, which they haven’t open source, but otherwise they even released a couple of papers about their internal strategies to optimize the model. One is called sparse mixture of experts, and they really produced a paper, so it explained to the scientific community what they’re doing. The inference was very fast when it came out. And then there is a newcomer from China, very new, I just heard about them like three weeks ago. It seems to be very, very competitive. It’s doing quite well on our leaderboards. We’ll talk about the leaderboards soon. And it excels in Chinese. It’s comparatively small. Like Llama 3 it’s very, very competitive. And I was trying to see if they have an API, but I think their API is now in beta, so it’s very, very new. Most of these Large Language Models, they come from the US. Only Mistral is from Europe, is a French company, I think. Finally, Yi is from China.

Now, which are the GenAI tools that most of our audience are using. It seems that ChatGPT has the crown here, and then Gemini comes second. As I can see Midjourney is also there, we have used Midjourney here, for this presentation, for a couple of images, but cool. Thank you very much. So ChatGPT has the crown over here. Okay, let’s continue.

Let’s talk a little bit about leaderboards. We have two types of leaderboards. We have game-based leaderboards, like the chatbot arena leaderboard. It’s based on duels. Everyone can play these little duels. If you go to thehttps://arena.lmsys.orgpage, you’ll see there, the presentation of two models, which you don’t know which models they are. And you have, you can execute a prompt against these two models. Then you get the response from these two models, which are anonymous, and then you have to, rate them. You have to say, this one is better than the other, or that one is better than the other, or both are the same. And this data is then gathered, this data is then used to produce this leaderboard. It’s basically a model duel, like in chess it’s also a kind of a duel where you can create the ELO ranking. They also use the ELO ranking methodology. This is my favourite leaderboard, because it’s very hard to cheat on this one.

https://arena.lmsys.org[6]

Then there are also benchmarks which are based on, benchmarks. And this is HELM. It’s also quite useful. You can have a look at it backed by Stanford.

What is Artificial General Intelligence? This is a hypothetical type of AI which performs as well or better than humans on a wide range of cognitive tasks. And Large Language Models have these characteristics. They’re self-learning, they have problem solving skills, and they are also good at understanding and reasoning. These models also are one of the reasons why a lot of people out there in the public space started talking about Artificial General Intelligence because they come close, they are generalists, they have lots of functionalities, they have lots of capabilities, and so they start to come close to this concept of Artificial General Intelligence. But they are amazing. They reminded ourselves about this concept of Artificial General Intelligence, but they are not perfect.

And here are some of the problems related to Large Language Models and also Multimodal Large Language Models. They sometimes tend to hallucinate to make things up when they are insecure about something. They also sometimes refuse to give you answers. There is here an anecdotal screenshot about, one kid who was 17 years old and he asked Gemini, C++ question, nothing illegal, and Gemini just refused to answer the question based on, his age. It says here you are under 18 concepts are an advanced feature in C++ it introduces potential risks and I want to prioritize your safety. The model just refused to answer, these questions. This is one example of a refusal. Then models also have some ethical barriers, but you can overcome them with some tricks. If you ask, ChatGPT for example, how can I make counterfeit money, then these ethical barriers, they stand in the way, but there are tricks around these ethical barriers, and you can get the answer. But I’m not going to talk about them too much. That is not the topic to jailbreak models. We won’t have a webinar about that. They’re very bad at word counting and I explained already, and they have knowledge cutoffs. They’re knowledgeable about the world and at the specific date. And a big problem is also missing sources. They have lots of knowledge baked into their parameters, but you don’t know from where this knowledge is coming. They can’t give you quote saying, okay, this comes from this source or that source. This is very unscientific, and this missing source is a big problem in Large Language Models.

Wrapping up. Large language Models represent a new technological milestone to impact our daily lives. Large Language Models, they convert language into a vector space, and they allow us to use vector databases and new type of databases. They are also trained to understand language on a wide range, on a wide range of tasks. They are very general about their capabilities, and they also adapt to human behaviours. They are trained to act very often like a human would act. And they are also pushing lots of businesses to rethink their strategies. They are changing the business world. That’s really what we want to look at in the next webinars. How can you use the power of these tools to create new business ideas? That’s the whole topic of the series.

Thank you very much. Some credits to DALL-E and Midjourney for some image generation and also to Andrej Karpathy, because he explained very well how tokens are converted and transformed and seen and consumed by Large Language Models. He has great videos, in depth videos about the technicalities of Large Language Models. Thank you very much. Now it’s our Q&A session.

Garima Dosi (Moderator):

Thank you, Gil. And the session was really very interesting and insightful, and I hope everyone enjoyed it and at least, got to know a lot of things about Large Language Models. We’ve got some questions, and with the short time we have, I’ll do my best to cover some of them.

The first one is, considering the dynamic nature of AI technologies, which means it, they change so fast, there are models every week, every day we see new models coming up. How do you envision addressing the challenge of effectively integrating LLMs into existing organisational frameworks? With the changing nature of AI technologies, how do we envision addressing the challenge of effectively integrating LLMs into existing organisational frameworks?

Gil Fernandes (Speaker):

I think this is a question which is targeting businesses. So how can businesses, incorporate Large Language Models and how can they, you know, develop and create business propositions based on Large Language Models?

I think education is a very important part of it. I think it’s very important for companies depending on their size to create teams, that are proficient or develop proficiency in these technologies. This is the first thing and the second thing, these teams which develop this proficiency, they should be able to create prototypes. They should be able to also develop ideas and create prototypes quite quickly because we live in a very experimental phase of the world. I think you need really the creation of some agile teams, that can develop prototypes very, very quickly, and teams that can develop, for example, agent driven applications quite quickly, that have also architects or visionary people in them that can come up with ideas, give it to a specific team. This team then develops prototypes that are then shown to business. You have to create some kind of workflow inside of the business where there is someone visionary, has an idea, then gives this idea to a specific team. The team creates a prototype, then this prototype is shown to business, and marketing people evaluate its chances and they either put it into practice or they throw it away. I think businesses need to start to have some kind of team with architects, developers. Actually, the business that interact with each other, which produce new ideas to cope with this, quickly with the cycle of innovation. I think that is really my idea.

Garima Dosi (Moderator):

Okay, great. Just to summarize, it’s all about, building strategies around creating teams. We can adapt to these changes, learn these changes, prototype, use it, experiment it, and then apply it quickly, get the feedback.

Gil Fernandes (Speaker):

To business actually let’s call the business Maria or something like that, to the CEO and show these new propositions. And then obviously there needs to be a decision whether to incorporate it or not. But I think if businesses are big enough, they will need to start creating these structures inside of their companies so that they can innovate quickly. Because if they don’t have this power of innovation, they might be, outperformed by other businesses.

Garima Dosi (Moderator):

Let’s take up another one, Gil. What are the risks of my business not embracing AI that is seeing it as the latest at hype as opposed to a genuine business tool? What are the risks of not embracing AI?

Gil Fernandes (Speaker):

I mean, the risks are there. AI allows higher degrees of automation. We didn’t talk about this today, but you can create, workflows, AI-based workflows where you use the power of these tools to automate some workflows, which you are well known and are in the company. You can create that, that’s one thing. Another thing you can create translation layers between, normal employees who use natural language and some technical systems. These are agents, so you can also create that. Again, this is a huge business opportunity that you have there. And then you can also start combining agents and create whole departments, which are just agents and automate, some workflows in your company. There are multiple, ways to integrate AI and to automate and to speed up processes in the company. If you say we don’t have, we don’t want to have anything to do with AI, you are not going to try out, AI driven workflows. You are not going to try out agents, you’re not going to try out simulations and just imagine if the other business who is your competitor is going full throttle on that one. Who will automate more? Is it you? Or is it the other business? There is this problem with competition. The ones who are the last ones to embrace this type of technology are losing out on some really good opportunities.

Garima Dosi (Moderator):

The last question, Gil. A question, from a programmer turned dietician LLMs have two problems, short memory, and as you perfectly describe, not perceiving words as words. Example is that unless instructed clearly that calories for the meal is a sum of calories of ingredients, it often provides wrong results because it treats ingredients and meal as separate entities. So, regarding short memory, even with great prompt engineering, the number of interaction to construct a diet are limited because it starts to hallucinate, so

how do you recommend to address it without creating your own database, but leveraging existing layer of AI, like OpenAI existing layers and feeding your data. So that example, to be a hundred percent sure that it has right calorie reference. Basically, utilizing the existing AI without creating your own database, how do you, recommend avoiding this problem of hallucination?

Gil Fernandes (Speaker):

This is a reasoning problem, right? The model is probably, making some reasoning mistakes and you want to overcome that. And normally one of the strategies would be to create steps of reasoning and let the model elaborate on that. Because there is this idea of chain of thought. When you break down a problem in multiple steps, and you do this with an LLM, typically the results are much better. And this is one of the techniques. The other technique is this kind of reflection. Another technique that you can use is in context learning. You give a context to it, you give some examples, and that is perhaps what you could do this. You could enrich your prompts and give there some, examples. This is called multi-shot prompting. I think this would be the best answer that I have is actually to try out multi-shot prompting really to describe in a couple of examples what is the correct behaviour and let the model then learn from those examples. And then, try to evaluate if the result is better. Multi-shot prompting would be concise answer to this one.

Garima Dosi (Moderator):

Thank you all for joining us today and finding time to attend this webinar. Thank you, Gil, for the great, presentation and all the questions that you’ve answered. We are sorry if some of your questions were not taken up.

Please do contact Gil with any queries or feedback on this session. His details are on the screen. He’s available via email attechtalk@onepointltd.comand onLinkedIn. And also you can read his articles on medium.com. They’re calledReflections on AI.

[techtalk@onepointltd.com](mailto:techtalk@onepointltd.com)

LinkedIn[7]

Reflections on AI[8]

A recording of today’s session and presentation and along with some relevant material and a bonus called TechTips, would be available on our website,onepointltd.comthe link for which will be sent to you post webinar.

onepointltd.com[9]

We will visit the trunk of the tree, like we said, the roots and the trunk of the tree. With the next topic, ‘Unleash the power of Large Language Models’ which would be divided into two parts. Part 1 called ‘Direct interactions’. And then the second part would be, following later. So please do not forget to register for these sessions

See you soon. Bye for now. Thank you all.

### Upcoming webinar

From fundamental concepts to cutting-edge developments, this session will equip you with the knowledge to make informed decisions about implementing AI agents in your organisation.

[Register now](/techtalk/ai-agents-demystified/)

### Webinar replays

From fundamental concepts to cutting-edge developments, this session will equip you with the knowledge to make informed decisions about implementing AI agents in your organisation.

[Watch now](/techtalk/ai-agents-demystified/)

In this session we explore more ways to get the most out of LLMs. Beyond the chat interface, which we covered last time, workflows and complex interactions are advanced ways to optimise the utility and efficiency of LLMs.

[Watch now](/techtalk/the-future-of-enterprise-data-access/)

In this session we explore more ways to get the most out of LLMs. Beyond the chat interface, which we covered last time, workflows and complex interactions are advanced ways to optimise the utility and efficiency of LLMs.

[Watch now](/techtalk/unleashing-the-power-of-large-language-models-part-2-workflows-and-complex-interactions/)

In this third session of the Decoding AI series, delve into the hidden potential of untapped data, like clickstream data, application logs, email communications, customer call records, and Internet of Things (IoT) data.

[Watch now](/techtalk/spotlight-on-dark-data-with-ai/)

Ready to dive deeper into the world of Large Language Models (LLMs)? This webinar, the second in our Decoding AI series, builds on our previous session on LLM fundamentals.

[Watch now](/techtalk/unleashing-the-power-of-large-language-models-direct-interactions/)

Are you ready to maximise the impact of your AI initiatives? Join Boomi and Onepoint for an executive-level webinar exploring the critical intersection of AI and Master Data Management.

[Watch now](/techtalk/ai-and-master-data-management-a-synergy-for-success/)

In this sessionwe look at the fundamentals of Generative AI and Large Language Models (LLMs) — one of the most transformative AI technologies to emerge in recent years.

[Watch now](/techtalk/fundamentals-of-large-language-models)

In partnership withGigaspaces, join our panelof highly experienced digital transformation and data integration specialists who will provide you with invaluable insights and actionable solutions on how to unlock the power of real-time data for digital transformation and AI decisioning.

Gigaspaces[10]

[Watch now](/techtalk/unlocking-the-power-of-real-time-data)

### Coming soon

For more webinar replays, visitOnepoint TechTalk

[Onepoint TechTalk](/techtalk#replay)

- What we doDo data betterInnovate with AI & moreArchitect for OutcomesSpringboard™ WorkshopOnepoint Labs

Do data better

[Do data better](/do-data-better)

Innovate with AI & more

[Innovate with AI & more](/innovate-with-ai-more/)

Architect for Outcomes

[Architect for Outcomes](/architect-for-outcomes/)

Springboard™ Workshop

[Springboard™ Workshop](/onepoint-springboard/)

Onepoint Labs

[Onepoint Labs](/onepoint-labs/)

- ResourcesOnepoint Data Wellness™ SuiteOnepoint TechTalkOnepoint Oneness

Onepoint Data Wellness™ Suite

[Onepoint Data Wellness™ Suite](/data-wellness/)

Onepoint TechTalk

[Onepoint TechTalk](/techtalk)

Onepoint Oneness

[Onepoint Oneness](/oneness/)

- About usDiscover OnepointClient storiesCareerContact us

Discover Onepoint

[Discover Onepoint](/discover-onepoint/)

Client stories

[Client stories](/client-stories/)

Career

[Career](/career-opportunities/)

Contact us

[Contact us](/contact-us/)

© Copyright 2025 Onepoint Consulting Ltd| Terms| Privacy notice

[| Terms](/policies/)

[| Privacy notice](/policies/privacy-policy/)

## Sources

[1] Do data better: https://www.onepointltd.com/do-data-better
[2] Innovate with AI & more: https://www.onepointltd.com/innovate-with-ai
[3] Architect for Outcomes: https://www.onepointltd.com/architect-for-outcomes/
[4] Home: https://www.onepointltd.com
[5] Onepoint Techtalk: https://www.onepointltd.com/techtalk/
[6] https://arena.lmsys.org: https://arena.lmsys.org
[7] LinkedIn: https://www.linkedin.com/in/gil-palma-fernandes/
[8] Reflections on AI: https://medium.com/@gil.fernandes
[9] onepointltd.com: https://www.onepointltd.com/techtalk/fundamentals-of-large-language-models/
[10] Gigaspaces: https://www.gigaspaces.com/

## Metadata

- URL: https://www.onepointltd.com/techtalk/fundamentals-of-large-language-models-replay
- Last Scraped: 2025-03-06 15:55:17
- Content Type: Web Page
