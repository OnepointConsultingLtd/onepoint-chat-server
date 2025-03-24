# Unleashing the power of large language models, Part 2 – Workflows and complex interactions Replay — Webinar — Onepoint TechTalk - Onepoint - Do data better | Innovate with AI & more | Architect for Outcomes

Source: https://www.onepointltd.com/techtalk/unleashing-the-power-of-large-language-models-part-2-workflows-and-complex-interactions-replay

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

## Unleashing the power of Large Language Models, Part 2 – Workflows and complex interactions

In this session we explore more ways to get the most out of LLMs. Beyond the chat interface, which we covered last time, workflows and complex interactions are advanced ways to optimise the utility and efficiency of LLMs.

This event was livestreamed and recorded

This webinar is designed for AI specialists, data scientists, CTOs, and technology leaders looking to maximise the potential of LLMs in their organisations. Business leaders will also benefit from the discussion, especially on what the ‘art of the possible’ is on applying LLMs and on getting value from the Dark Data buried in your business.

This webinar is the 2ndpart of our previous Unleashing the power of Large Language Models session. While not mandatory, familiarity with direct interaction concepts will be useful. You can watch a replay of Decoding AI: Session 2 webinarhere.

[here](/techtalk/unleashing-the-power-of-large-language-models-direct-interactions/)

Garima Dosi (Moderator):

Welcome everyone again to Onepoint TechTalk yet another session in the webinar series, Roots to Fruits Decoding AI. For a recap, we are progressing from fundamentals of LLMs, on how to use LLMs or to how to use LLMs. From the fundamentals to how to use LLMs, from the roots of knowing LLMs to the trunk and branches about using it. In one of the previous webinars, we had discussed the trunk with the topic, unleashing the power of Large Language Models, part 1 – direct interactions where Gil Fernandez, our AI expert, had explained about directly prompting LLMs and interacting with them. So, in this webinar we take a step further in discussing advanced ways to use LLMs efficiently and in an optimal manner, which can also enhance the capabilities of the LLMs themselves. And therefore today, the topic for discussion is unleashing the power of Large Language Models, part – 2 workflows and complex interactions. We are moving from simple interactions to more complex interactions and workflows. It is a pleasure to once again invite, Gil to impart his knowledge and experience on this topic, as he always does. I would also like to remind everyone that all resources of this session would be made available to you, and there will be a Q&A session at the end, just to clarify any doubts you may have. So, Gil requesting you to take it from here.

Gil Fernandes (Speaker):

Thank you very much Garima for this, introduction. Let me start the presentation. Okay, let’s see if the slides are visible. Okay, great. We are going to talk about the previous webinar and which insights we gained from the previous webinar. I’m referring to the second session we actually had, which was mostly about Natural Language Processing. Then we’ll talk about in-context learning. In-context learning is really, really extremely important.

Garima Dosi (Moderator):

Gil, I’m sorry to interrupt, but can I request you to be a bit louder so that it’s clear? Your voice is clear then.

Gil Fernandes (Speaker):

Yes, yes. Yes. Sorry about that.

Garima Dosi (Moderator):

Thank you so much, much better now.

Gil Fernandes (Speaker):

Yes, Thank you very much. Sorry about that. Okay, so I’m just going to repeat.

We are going to talk about the previous webinar and, which insights we gained from it. Then we are going to talk about in-context learning. This is an essential concept for this webinar. After this we’ll be talking about Retrieval Augmented Generation, which is based on in-context learning and, you can use it, really in your business. It’s something that from which you can expect a lot of value. Then we are going to talk about reasoning strategies. Then this is the bulk of today’s, webinar and perhaps the most important topic here is topic number 4. Then we’ll also have a short demo of one of the products we have developed recently, which is the D-Wise tool. And then after all of this we’ll have a Q&A session. I hope my sound is clear and good, and the presentation is visible.

What did we discuss in the previous webinar?  is the next topic. But before we get there, I would like you to tell us in a poll for which tasks you are using Large Language Models and Multimodal Large Language Models. You can use them to write communication like email, et cetera. You can use them to improve correct, summarize text. And third one translate text, summarize text like it is here. You can also use Multimodal Large Language Models to generate images or even audio files you could generate with them. For example, on services like udio.com. You could also generate video. Are you generating video with multimodal models? Are you also using, these types of models, Large Language Models to generate code? If yes, let us know.

Let’s continue from here. Large Language Models that are really suited for many scenarios, but they’re not suited for others. They’re really great at Natural Language Processing tasks. They’re also great at extracting structured data from unstructured data. This is almost like a killer feature of that Large Language Models. And they are also good at tackling the problem of Dark Data in enterprises. The previous webinar was exactly about Dark Data with my colleague Allan Schweitz. It was an excellent webinar about this problem. You could just go on our website and just have a look at that. But today’s topic, definitely not Dark Data. We’re gonna talk more about reasoning.

Large Language Models are really suited for many scenarios, but not for others. They struggle, for example, with limited reasoning. They have knowledge cutoffs for it means that they know about our world until a third date, and then they don’t know about it. They don’t also know about weather predictions, for example. They are not very good at long-term planning. They are missing sources, so they never seem to be able to tell you, from where they got specific information. And they have also problems with hallucination. Sometimes they just make facts on the fly when they’re insecure and they also have problem refusal. Sometimes they just refuse to give you information on some ethical concerns which are not valid.

How you can actually get value out of Large Language Models. You can fit by the direct interaction. This is the basic thing.  You can also extract structured from unstructured data, like I mentioned.  You can also create automation and workflows with Large Language Models. So that’s also something that definitely you can do. And these workflows are normally written in software, but you can also create manual workflows with Large Language Models, even though people tend not to do that so much. Like I said, you can leverage Dark Data. You can also use them for simulation, and you can also create the agent.

I would just like to see, which are the result of our poll. Most people seem to be using it to improve and correct text. The Large Language Models they used in this capacity. They’re also used to write communication. That’s the second highest kind of, option which was selected and summarizing text and also generating images. Generate images like in second place kind of here. I use it also for generating images, generating audio files like music. I suspected that not many people are using it right now, and this is the case here to. Generate video I’m very surprised that two people are actually using it for generating video. And generate code programming. We have some programmers here, which is also good. Thanks a lot for that. Let’s continue.

These are I think the four main possibilities to interact with Large Language Model at a very high level. They are the following. You can directly interact with the Large Language Model. This is obvious what this is. Then you can create workflows around such Large Language Models. And this is what we are going to talk about today. That’s why we have this in blue. Then, you can also create agents. This is the topic of upcoming webinar, and then you can also create simulation framework with agents also. I think these are for me the kind of four kind of main usages or the possibilities of interaction with Large Language Model. Here is, an example of a workflow which we had in the previous webinar.

Now I’m going to introduce this concept of in-context learning, which is a crucial concept for interacting and extracting value out of Large Language Models.

Large Language Models, they can learn based on what input they have so they can learn on the fly. If you ask a question and you give some extra information to Large Language Models, they can extract on the fly information from that text. It’s not that they are being trained, but they actually learn in this moment, in the moment of the inference, in the moment of the processing of the question. So here I have an example where you clearly see a question which, ends in, can you describe the Mamba neural network architecture? Then we can see some text which was just extracted from a scientific paper. And so in this case, we are augmenting the knowledge of, the Large Language Model by giving it a specific context.

Why is this so useful? This allows Large Language Model to access data, which is not accessible to them at training time. You can give them some context which derive from the private knowledge of your company of your enterprise. This helps also to reduce hallucinations because you are grounding the model on some specific fact, which is given as a contact. And it allows you also to create applications like the applications called RAG or Retrieval Augmented Generation style application. We’re going to talk about this, next. And, there is also, another benefit. It allows you to track sources because when you provide a context, typically you know about the source of the context, and the answer can also contain a reference to this source. This is something which is also important. These are like the benefits of in-context learning. Okay, so my voice is not clear. Is this better now?

Garima Dosi (Moderator):

Yeah, much better. Gil.

Gil Fernandes (Speaker):

Yeah. Okay. Sorry about this. Okay, I’ll try to keep it this way. I’m sorry.

So, these are the four benefits about in-context learning. Access to private knowledge, reduction of hallucinations. It allows you also to create Retrieval Augmented Generation (RAG) applications, and it allows you also to reference your sources.

Let’s talk a little bit about Retrieval Augmented Generation applications and how they work.

Retrieval Augmented Generation applications are applications that implement a specific workflow. Actually, they implement two workflows. They have two workflows, and the first workflow is the processing workflow, the workflow, which processes the messages. And this is the workflow you can see on this slide. And in this workflow, you have three involved components. You have the Large Language Model for short, LLM, you have a vector database. Typically, it’s the vector database, but you can have a different database. It’s not necessarily a vector database, but in most RAG applications you use a vector database, and then you have an orchestration layer, which is typically some sort of software.

Let me explain the workflow because this is important to understand. Normally, at the beginning of the workflow, a user asks a question, then this question is converted into a specific format using the Large Language Model. So, the text of the question gets converted into an embedding, and this is, a vector. And a vector is just a representation of a point in a latent space or in the multidimensional space. It’s, it’s not a little bit complicated, I know about that, but it’s actually just, some representation of the question. And this representation of the question is then used to look up similar text in a vector database. The vector database just picks whatever, representation you have of the text and using that representation, it just searches for similar text, and then it gives you similar text. So, text that is semantically associated to your question. And this text then gets converted into the context of your question, which you then send to the Large Language Model. So, there is, here we are using in-context learning, but we are using a search database to patch the context for you. The context is produced on the fly, and after you send the query with the context to the Large Language Model, then you get an answer and the workflow ends. This is what RAG is actually about. RAG is a specific type of workflow, which uses a Large Language Model vector database, and it’s a linear workflow typically. Now, there are more complex types of, Retrieval Augmented Generation workflows, but we are going to talk this in future webinars. For example, there is, a specific type of RAG which is called GraphRAG, which uses, graph database. It also uses a vector database, but also uses, a vector data. So, two databases to expand the context and give you better results. But it’s definitely just a variation of this principle.

I said before, there are two types of workflows you need always to index your data in some sense.  there is also an indexing workflow, which is extremely simple. You need to prepare the vector database or whatever database you use, to be able to perform these semantic searches of text. So, this workflow has three steps. Normally, you read files, lots of them, not just one file. In this case, then you request embedding from whatever Large Language Model you have.  And finally, you’re right to update your embedding into database. You need before you can create your RAG application to index your text, basically.

Now, you could also do much more interesting things with RAG, but these are the main business use cases.  You can talk with your documents, that one use case. The other use case is search augmentation. And this is the topic for businesses like, Perplexity.ai that they have. For example, they, instead of, you know, using a vector database, they use a search engine to retrieve result and, create their contact. I don’t know, 100% what they do, but they definitely are a RAG based application. They get a search question, and then they search, they perform a web search, then they create a context right from that web search, and then they, use that as a context for the question, and then they answer the question. So that’s what Perplexity AI is doing search augmentation.

You can use the RAG applications for customer support. That is completely okay. Customer support has a lot of documentation. Instead of having someone who actually receives a question, go through the documentation and gives an answer to, some customer, what you can actually do is create a direct system, which, automatically will go through the documentation and will provide answers in real time. You could automate a lot of customer support using RAG applications. You can also use it for product search, like that’s very similar to search augmentation, and you can also use it for content creation. If you are creating content, for example, you can also a ugment, the content creation by using RAG systems to augment whatever generation you are actually doing. You can imagine, RAG systems also in very creative and, different scenarios like generative scenarios too.

Now we are going to, talk about the main topic of today’s webinar, which is really about reasoning strategies, but it’s also related to in-context learning. And I’ll try to create the bridges here. Let me see if I can do it correctly. We’re gonna talk about these topics, Chain of Thought, Tree of Thought, Buffer of Thought, and a little bit about Monte Carlo Tree Self-refine, which is also very similar to Tree of Thought.

Let’s talk about Chain of Thought. The main idea about Chain of Thought is really what we have on the slide is to ask a question, which is typically a problem, and then instruct a model to break it down in specific sub problems, and then let the model solve each the problem. And this will create a context. Basically again creating a context on the fly based on, sub questions. And after creating all these satisfactory, satisfying context, then you can actually provide an answer. Let’s see how this actually works.  so first you need to describe your main problem normally, and then you need to break down the problem in sub questions. And then you enrich your context. And after enriching your context in a satisfying way, then you can, get the main question to be solved.

Let’s see how that works in practice. In practice, you have a main problem, and then you break this problem down in problem 1, problem 2, problem n. And then after solving each of these problems, then you are going to be able to solve the main problem. Now, note that here we are using in-context learning, but in this case, we are not providing the context just in one batch, let’s say. So, we’re providing the content, piece by piece by solving each problem. So again, we are using definitely in-context learning here, but the context is not generated in just one operation. Like with RAG, the content is, created in an organic way by solving each step problem. This is the essence of the whole process.

Now, I played around with ChatGPT, and I played around with specific, prompts. And, for some, questions which require some multi-step reasoning, ChatGPT-4o, I’m talking about ChatGPT-4o not latest models. We’ll talk about them soon.  I figured out they’re not very good at these problems, and the problem I gave them a rather silly problem, but the prompt is like this. James likes to hear music from the eighties, and there is one band which he appreciates very much. Till now, I didn’t say much, just that there is a band of the eighties. They have this song in which the name of a female is related to an adverb. So, there is a song and there is an adverb in there. The pronoun is related. Actually, the adverb is related to inconsistency, and the person in the song is female. The band’s name is somehow related to healing. Which song are we talking about? This is a kind of a riddle and, ChatGPT completely failed on it. It came up with some bands which are not correct, and then I tried to solve the first problem, which is just okay, figuring out which is the band.

Then I asked it, can you first try to identify the band by looking at the period? And then the fact that the band is related, band name is related to healing, and then it came up with the cure. Yeah, which is okay, it’s solved the first problem, which is figuring out which is the band. Because first you need to know the band. So, after that you can know about the song, right? So yeah, I figured out the band at this step. Then I asked, a second question, and I said, you got that right? It’s true.

Now focus on the name of the song. There is a female name in this song, which could it be? So, I just said, okay, find some songs where there is a female name. Yeah. And obviously it knew from before that there is dissociation with inconsistency, and it figured out, it’s actually Charlotte Sometimes. So it got that, right? If you try kind of one-shot questions, the results are not so good in this case, but if you try to go through this Chain of Thought process, then you get actually much, much better result.

You can also try to induce the Chain of Thought by having specific prompts like this one. You carefully provide factual, accurate, thoughtful, and nuanced answers. You’re brilliant at reasoning. If you think that you might not be correct, you say so, you always spend a few sentences explain the background context, assumption, and step by step thinking before you try to answer the question. You can also create a specific try to induce, a Chain of Thought behaviour by giving the model specific instructions. But this is something, that you can just use like that.

But there is a new development in the ChatGPT world. And, last week, ChatGPT o1-preview and o1-mini were released. And to my surprise, they introduced some kind of workflow, which contains the generation of a Chain of Thought. So, we had to look at that. This o1- preview and o1-mini both of them, they operate into steps. They have a reasoning step, and they have also a response step. And if you use the user interface, it’s quite obvious because, if you ask them a question, then it will generate thoughts. And this is quite a slow process. It generated, for example, this question, it took like 33 seconds, but after generating this thought, it’s quite quick to generate an answer. So, this was me here, you can see in the slides me trying to use it for, the Game of 24.

We’ll explain now what the Game of 24 is actually, it’s a game that, many researchers use to test the reasoning capabilities of Large Language Models.

Now, I also tried, another problem on a o1- mini, and it completely failed on this problem, and I was really very surprised by this. I asked it to solve the Game of 24 with, the numbers 5,3,5,3. The Game of 24 typically uses four numbers, and, your target is to generate, a combination of, arithmetic operations, which results in 24. And with 5, 3, 5, 3, the way to generate 24 would be to multiply 5 by 5, which gives you 25, and then subtract 1 from it. And 1 is derived from 3 divided by 3. So, like this, you get 25 minus 3 divided by 3, which is actually 24. But instead of doing that, it actually violated the rule to the game and used 3, 3 times. In here. So, this is definitely, for me, it’s not a correct answer. You cannot use, you cannot multi, use, 3, you have only two 3s and not three 3s. So, this answer is just incorrect. So even latest model sometimes fails on this kind of reasoning path. As you can see, it was very surprising for me. I tried this and it just gave me this weird result. Yeah, but there’s definitely an answer to this question to 5, 3, 5, 3 on Game of 24.

Let me explain now a little bit, about, Tree of Thought and a little bit more also about Game of 24. And talk a little bit more also about reasoning. We’ll get back to this Game of 24.

What are the reasoning options you have? Normally, you have this Chain of Thoughts, which is just a sequential chain of, depths which break down the problem until you get to a solution. That what you see here in the slide on the second position. There is input output. This is just the normal kind of interaction which you have with, Large Language Models on the foremost, left side. Then the second option here that you can see.  So, the second one is just a Chain of Thought. You have a problem, you break down the problem in small bits, and after you solve all the bits, you can solve the main problem. Then you can repeat multiple Chains of Thoughts. So, at the beginning of the question, you create multiple Chain of Thoughts, and then you try to solve all of them until you, get some kind of majority vote, or you get the best one, the best, Chain of Thought, which gives you the best results. And then based on that, you find a solution. Or you can also use this Tree of Thought, which is another strategy to solve this kind of logical problems like Game of 24. Yeah, in this case, in this case of Tree of Thought, you created each step multiple responses. And then you try always to find which are the best responses at each step. And then, and then you just repeat the process basically. So, you find multiple answers, for each step. Then you select the good ones, give out the bad ones to do some kind of pruning of your tree, and then you, repeat the step, recursively until you find a solution. And as soon as you find a solution, you’re done. So, this is what is represented on the right side.

Now I wanted to ask you about this Game of 24, which, because this is an excellent game for, testing the reasoning capabilities of Large Language Model. As you see, even the test models out there sometimes fail on this game. This game is relatively simple. Like I said, you get four digits always. You can use this digit just once. You cannot do like what ChatGPT o1-mini did. It just used one-digit multiple times. You cannot use that. So, if I give you an example, like 6, 2, 16, 6, so you can only use each number just once, and you can use, subtraction, adding, you can use multiplication and division. You can use all these operations as you wish, and you can also combine numbers in different ways. Like here, for example, 6, 2, 16, 6, there is one solution. It is 6 multiplied by 16 divided by 6 minus 2, for example.

Now, I just wanted you to tell me here, we have four possibilities, and the Game of 24 is not always solvable. Sometimes it’s like the game of solitaire, which sometimes you cannot solve. I want for you to tell me which of these options doesn’t have a solution. So that’s the question, what this question is actually about. So can you figure out which of these options here, does not have a solution, is unsolvable. Thank you very much for this.

Let’s continue. Like I said, ChatGPT gets very often this game wrong. I tried it on the previous version, ChatGPT-4o but also o seems to make booboos. This just an example on on 5, 3, 6, 3, is another combination. And actually, you can see a solution here. 5 multiplied by 3 is 15, 6 plus 3 is nine, 9 plus 15 equals 24. So, this is one possible solution. But then very often in Game of 24 of multiple solutions, but ChatGPT-4o is a bad player. Actually, the new versions are much, much better at this game. Yeah, just getting it wrong.

Just going back to this idea of Tree of Thoughts. So, with Tree of Thoughts, the authors of this paper, which is mentioned here, they actually just got so much better scored, but how does Tree of Thoughts again operate?

It has four steps there is a proposal step in which the solutions are proposed. You get two steps, you can have multiple solutions, then, you calculate those solutions, then you evaluate those solutions so that you can actually then sample from those solutions. So, remove the solutions, which are not good, and you do this step, and you perform these steps multiple times until you get to a solution. That is the essence of this idea behind Tree of Thought.

And so here is a workflow, there’s a user query. Then you use the Large Language Model to propose multiple solutions. Then you calculate the values. So, this you actually do probably in code. Then you let the LLM evaluate if the solutions are good. If the solutions are not good, they’re kicked out. If they’re okay, they’re kept. And then you repeat with the good solutions, you repeat the step of proposal calculation evaluation until you find a result. When you find a result, you go get out of the loop, you stop everything. So, that’s the workflow behind Tree of Thought.

And so, just the result that just kind of mind blowing, just using the LLM on input output gives you like 77.3% of success. But if, Tree of Thought is used, you get up to 74%. So, it is amazing. And I think that is what also ChatGPT is doing these days. They’re really generating Chain of Thought or even like Tree of Thoughts. And by just doing this, they’re improving the reasoning capabilities of these models extremely. So, what was being done manually now is actually done, by a system. And the reasoning capabilities are actually now much better, even though, you can still find flaws like I did, but it’s just amazing what, o1-preview and o1-mini are actually doing right now, but they are exactly doing this kind of thing. They generate a Chain of Thoughts basically, or even a Tree of Thoughts. I don’t exactly know what strategies they’re using there because they also don’t talk too much about it. But then they, by doing so, they generate the context, and then when they answer the question, they have this context, which is the Chain of Thought. And this empowers the Large Language Models to deliver so much better results.

There are other strategies like Buffer of Thoughts, which I just will explain very briefly. The concept is quite interesting because this is about having templates which solve specific problems. And these templates are stored in this Buffer of Thought. So, when you get a problem, you do a lookup in some kind of template database, and this template will give you either some code or some specialized prompt back, and then you use this specialized prompt or this code to solve your problem. So, what you need to do is actually understand which are the parameters, to be used in the code or the parameters to be used in the prompt. And then you let either some code or the, some Large Language Models solve this problem. It’s a very interesting idea, but I didn’t find a really good implementation of this.  But it seems also according to the authors, to improve a lot the accuracy and efficiency, and it’s also pretty fast. So, this solves one of the problems I think of these, Chain of Thought system, which is actually speed. You could actually try to address the problem of speed with this meta buffer and with this Buffer of Thought. Right now, this is a bit theoretical, but that’s a very interesting idea, I think should be pursued.

Here is like a detailed workflow. You need to distil the parameters. Obviously, you need to know what are the parameters and which are the templates that you actually are going to, fetch. If you don’t have a template for that, eventually you need to create a template for solving this specific problem.  And then when you have, when you have created a new template for solving the problem, then you need to store it in this kind of meta buffer, which is some kind of database with solving templates. And then, after having, you know, retrieve your template, then you can just execute it, and you can get an answer. So, this is like the Buffer of Thought.

Then there is also Monte Carlo Tree Self-refine. I won’t go too much into detail of this, strategy here, but it’s similar to Tree of Thought only that you are using a specific metric to which you attach to each node, and then you traverse the tree according to this metric. So, there were a big amount of techniques, which come from research papers, which are there just to improve limited reasoning of Large Language Models. So, the truth is Chain of Thought, Tree of Thought, Buffer of Thought, even more refined strategies like a Monte Carlo Tree Self-refine. They do all improve the reasoning capabilities of Large Language Model, and they’re based on workflows, and they’re also based on in context, incremental context learning.

And there is just an explanation of Monte Carlo Tree Self-refine. Due to time constraints, I think I’m not going to go through much through this.

I just wanted to have the audience inside from our little quiz. Don’t know, I give up. So, the most actually congratulations to you guys, to the ones who actually were able to, say that 5, 5, 5, 7 doesn’t have a, a solution. It’s true, it doesn’t have one and don’t know I give up. 5, 5, 5, 7 is you cannot solve. Actually, I tried this 5, 5, 5, 7 with, o1-preview, and it got it right. It actually figured out no you can’t solve it. Great.

I just wanted to, have a small live demo of our product, which is the D-Wise is about, a questionnaire about data integration and data governance practices. And it’s also a tool which gives you an evaluation of, how well you are doing in data governance, and data integration, and also other data related disciplines. And so, we use the reasoning capabilities, let’s say so, of the Large Language Model in this product. I’m just going to explain you, how this actually works. So just, just gimme a moment. I’m just going to share my browser. Lemme just quickly get it there. There you go. I hope you can hear me well.

I started at the end of it.  Let’s look at it. Let’s restart this tool. Let’s restart the wires and see what it does. When you start this tool, you can select topics for the questionnaire, and you can also select the depth. I’m just going for a very shallow depth because of the time constraints here. And I’m just going to choose three topics, which is just the minimum. I’m going just going to choose Data Acquisition, Data Modelling, and DataOps, for example. D-Wise is going to drive me through a questionnaire, and then it’ll do an assessment, and it’ll then help me to evaluate how well my company is doing.  I’m just going to save the configuration, and then it should start.

It tells you which are the topics, which are being assessed, and it’ll present to you questions. These questions are predefined, but the sequence of the questions is determined by the Large Language Model. So, the Large Language Model will choose where to drive. Let’s say they are the questions, the sequence of questions it will be chosen by the Large Language Model at each step based on the context that, is generated dynamically. So here you have, an example of how you use, in-context learning in a dynamic way, which is also what, for example, these techniques like Monte Carlo Tree Self-refine and Tree of Thought, and all of these techniques actually do.

So, the first question is, how is data shared with Excel partners outside of the organization? And I can say, okay, we have a very organized way of sharing, and as you can see on the right side, you start to see an image, which is just the evaluation spider chart. This still gives you an immediate evaluation. And this evaluation is also based on interactions with the Large Language Model, which tries to, get the sentiment from what you actually reply to it. How is data ingested into the data lake? If you don’t know about the data lake, you could click here, and it’ll just explain to you what the data lake is. So, I know this is pretty technical, but I suppose the audience here is also a little bit technical. You’re just asking about how the data is ingested into, the centralized repository of data. And we can say we are a very organized company and just, kind of mocking a user in some enterprise right now. And then the Large Language Model chooses from our database of questions the third question. How are different data sources integrated with the data lake? And I can say, well, I’m not quite sure about it Ad hoc. As you can see, I’m getting some points here, but now you can’t see any nice geometrical form here because we need more information.

In from Data Acquisition, it jumped to DataOps – Data operations. Do use DevOps/DataOps pipelines? You can actually get my information about this, what DevOps are. And DataOps pipelines, like DataOps pipelines for example, refers to a set of practices, processes and tools designed to improve the speed, quality, and reliability of data analytics and data management. Now you know a little bit more about this. Most big enterprise star companies, they do use these types of pipelines. And then, here, another question comes up, which is, again, chosen by the Large Language Model. Do you have a roadmap for DevOps improvement? And, let’s say, okay, we have one. Cool. And as I’m changing this, the evaluation is going on in the background, and as you can see, it’s building this Spider chart. Then the last question for this topic are the tools used for DevOps/DataOps effectively meeting your needs? And you can actually, say undecided, I’m not really sure about it. We didn’t evaluate it, for example. So, I’m choosing options from these, predefined options here. But obviously I could have also typed something here.

Now the next question is there a conceptual, logical and physical data model for the entire organization or just few selected domains? Normally there is only for selected domains. Sometimes there is for the whole organization. So, I just said undecided in this case, like, not really, sure. Is there a data dictionary for the data models, let’s say so yeah, there’s the data dictionary for the data models we have. And final, this is the final, final question. After this, we’ll get the report. Do the data models use the tool to generate physical data models or generate EML? So, normally they use tools. I’ll say yes. Affirmative.

And let’s see, we should get some kind of triangle in here. That’s the triangle has been evaluated, and now it’s actually generating a report according to a specific methodology that we use to evaluate companies. And you actually got a relatively decent score here. And obviously this report is also, generated with the help of a Large Language Model. And as you can see, you get an overall classification, and then you get also a detailed classification as a PDF report, which I just downloaded over here, which has much more details about how the maturity level was actually generated. And it also has some maturity levels according to a specific standard that we use at Onepoint.  And then you have the chart.

But that’s about it. So, we are using Large Language Models with in-context learning, with, incremental in-context learning, which is a strategy which is as actually used by all of these strategies we talked about today, including Chain of Thoughts and Tree of Thoughts. I think I’m done here. Thank you very much for your attention. And now Garima, it’s time for Q&A.

Garima Dosi (Moderator):

Sure, Gil. I mean, the information, the techniques that you shared were really some in-depth and thoughtful techniques. I would say it, it felt like the LLMs could actually think and act, especially with the D-Wise tool. It displayed a great level of wisdom and also reasoning. It was good, that ways, and we’ve got some questions. And one of them is how do you decide which reasoning strategy should be applied when or to how to apply reasoning strategies? Which one should be selected depending on the use case, and how do you measure the performance of a strategy being used?

Gil Fernandes (Speaker):

Well, measuring the strategy? So, measuring the performance is perhaps the second part of the question, and which strategy to use when? I think, there are two questions in here. The first question is about which strategy to use. So, depending on your problem, you have to use a specific strategy. For example, if you have a problem which requires kind of this, discovery and an answer, and where the whole logical process is really sequential, then you use definitely Chain of Thought. Like, remember that question, which I had, as an example where I asked about the song title of a specific band in the eighties. This is really kind of sequential problem. So, Chain of Thought is perfectly fine for that because it’s just you need to solve one sub problem, then you need to solve the other sub problem, and then you get to the solution. The Chain of Thought or sequential logically sequential problem.

Now, when you have, a space, a solution space, which has, exponential amount of solutions, like for example, when you’re dealing with chess, or even with this Game of 24 actually, so then you use, need to use something like, Tree of Thoughts, then you really need to generate that each step, multiple solutions. Then you need to find which solutions are okay, which solutions are definitely not okay, you need to discard the bad sub solutions, let’s say so and then you need to elaborate the same step again on the, on the second and third steps. Until you decrease the complexity of the problem, and you can reach a solution.

When your space of your solutions is exponential, you need to use something like Tree of Thoughts or Monte Carlo Tree Self-refine. Now, the problem with exponential solution space is always that you are constrained by resources because sometimes there are so many possible solutions that you need some kind of strategies to minimize the time you consume. And then that’s where some optimization strategies like this Buffer of Thought can actually be used. This is the first part of the question.

Now the second part, how do you actually evaluate, for, games, or problems like Game of 24, actually the metric is pretty simple. There is a solution, you need to verify if the solution is just correct. It’s just some kind of binary verification. Either you got it right or you didn’t get it right. So, you can use things like accuracy, for example. Just, check the amount of times, that you get something right and divide by the number of attempts. That’s the very, very simple metric. But now there are other problems which are not as easy to, verify in terms of performance.  and what these two will actually need to look for more specialized, types of metrics. And I’m not the specialist in metrics, but okay, for Game of 24, the metric could be really accuracy or something like that.

Garima Dosi (Moderator):

Correct. Yeah.

Gil Fernandes (Speaker):

You need really to see what kind of problem you have, but I suggest really to start with something simple like Game of 24 to see if your reasoning strategy is really okay, and then adapt it to a more complex problem. And then there are also problems that, are really kind of hard, you know, to measure in terms of performance. If there is some degree of subjectivity and there, you would need to kind of be creative about it, I guess. Even human evaluation strategies is sometimes, a good thing to have instead of having a system where, you know, like the answer is you just have a voters kind of vote for how good the response actually was. So that is also another option. I think I talked about it. Great. Go ahead with the next question.

Garima Dosi (Moderator):

The next question is, what are the most significant challenges companies face when integrating advanced LLM features, like the ones that you explained into existing business processes? If someone wants to, or company wants to integrate the, let’s say, Chain of Thought or Tree of Thoughts into the existing business processes, what are the challenges they would face?

Gil Fernandes (Speaker):

I think, one challenge definitely that some information the companies have is private of private nature. You just don’t want to send it over the internet to some LLM provider, which might say, perhaps I’m not going to use your data for our training, but then suddenly there is a leak and then private company data is exposed to an LLM, and suddenly you can go to this LLM provider and ask internal questions about your company. I think this is a huge headache. I think the first thing that, you, you’d be you need to really, to be careful about is about data leakages. I think that’s a huge problem for companies in general. So there, there are solutions for this, but sometimes it might be that the company wants to do something that is extremely advanced and only the top-level models can actually solve it. Then you have immediately this kind of problem that, internal data might leak. So, the problem of leakages is one of them.

The other problem is also I think knowhow and also to you need some degree of experimentation to see really what works and what doesn’t. Another one is that the LLMs are, expensive to, maintain, they’re expensive to operate. So, they’re also this, I think if you, are not using one of these big providers like law, et cetera, then you need to host the Large Language Models yourself. So, you need some kind of infrastructure knowledge, DevOps, whatever for that.

That’s also another problem that you definitely are going to get there if you use, techniques like, Chain of Thought, et cetera.  Remember these techniques are kind of expensive and you see in terms of time. There is always the problem of latency if you use a lot of Chain of Thought, and if you use Tree of Thought, it even gets worse. Because a user might ask a question and then this is a usability problem. And then, the Chain of Thought has to run for such a long time and, you know, the users say, oh my God, it took, three minutes to solve this question. So, you have a usability problem also there if you use the very advanced reasoning capability. You have to fine tune things very nicely to see, to deal with the constraint of time also. I see multiple problems there from experimentation.

Also, lack of people who actually are really experts in this area, because to be honest, there are not many experts in this area of integrating Large Language Model into business process. It’s also a kind of accent there. How to say an area is born recently, so you can’t say, oh, I have 20 years of experience in this area. You don’t.

Garima Dosi (Moderator):

Yeah. It’s all in the experimental feature, I would say. So, couple of, just to summarize, it could be data privacy problem, could be cost related problems, then it could be skilled resources, availability problem and similar other problems. I think that comes into.

Gil Fernandes (Speaker):

And usability problem, if you use Chain of Thought. You see this also, for example, in this o1-preview model and this o1-mini, it takes sometimes minutes to generate. Now imagine that you want to embed this into a very sleek and nice user interface, and now the user ask the question and then the poor user has to wait for five minutes because it generated a very complicated risk.

Garima Dosi (Moderator):

That’s Right. I think, Gil, that’s it for today. Thank you for joining us, everyone on this webinar, and then thank you, Gil.  Please do contact Gil with any queries or feedback on this session. As always, he’s available by email attechtalk@onepointltd.comand onLinkedIn. All details are displayed on the screen. You could also read about Gil’s blogs, atmedium.com. And so, as mentioned, a recording of today’s session and presentation would also be, sent to you and will also be available, on our website,onepointltd.com. So, all the more interesting sessions coming soon in the series, as Gil mentioned, some of the topics like agents, RAG, and some other involving topics also coming soon. So please stay tuned and, look for our next webinar.  Thank you for joining us today and bye for now.

[techtalk@onepointltd.com](mailto:techtalk@onepointltd.com)

LinkedIn[6]

medium.com[7]

onepointltd.com[8]

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

Gigaspaces[9]

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
[6] LinkedIn: http://www.linkedin.com/in/gil-palma-fernandes
[7] medium.com: https://medium.com/@gil.fernandes
[8] onepointltd.com: https://www.onepointltd.com/
[9] Gigaspaces: https://www.gigaspaces.com/

## Metadata

- URL: https://www.onepointltd.com/techtalk/unleashing-the-power-of-large-language-models-part-2-workflows-and-complex-interactions-replay
- Last Scraped: 2025-03-06 15:55:19
- Content Type: Web Page
