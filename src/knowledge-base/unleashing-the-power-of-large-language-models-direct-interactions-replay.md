# Unleashing the power of large language models, Part 1 — Direct interactions - Replay — Webinar — Onepoint TechTalk - Onepoint - Do data better | Innovate with AI & more | Architect for Outcomes

Source: https://www.onepointltd.com/techtalk/unleashing-the-power-of-large-language-models-direct-interactions-replay

*Onepoint - Our experience helps to solve questions related to on-prem or cloud; data strategy or governance; data engineering or analysis, delivering the best possible outcomes. Doing data better.*

## Content

- Do data better
- Innovate with AI & more
- Architect for Outcomes
- 
- 
- 
- Search for:Search

Do data better[1]

Innovate with AI & more[2]

Architect for Outcomes[3]

Home[4]

Onepoint Techtalk[5]

## Unleashing the power of Large Language Models, Part 1 — Direct interactions

Ready to dive deeper into the world of Large Language Models (LLMs)? This webinar, the second in our Decoding AI series, builds on our previous session on LLM fundamentals. We’ll explore advanced LLM capabilities and their practical applications in enterprise settings.

This event was livestreamed and recorded

- Gain in-depth understanding of effective techniques for direct interaction with LLMs.
- Learn how to use LLMs to work with unstructured data.
- Discover creative ways to combine LLM skills for innovative solutions.
- Explore the potential of LLMs in tackling Dark Data challenges.
- Engage directly with our AI experts to address your specific LLM implementation questions and challenges.

- Advanced prompting techniques for direct interaction with LLMs.
- Insights into Natural Language Processing (NLP) capabilities of LLMs, including translation, summarisation, and sentiment analysis.
- Strategies for using LLMs to extract structured data from unstructured sources.
- Understanding Dark Data and how LLMs and Multimodal Large Language Models (MMLMs) can address its risks and opportunities.

Gil Fernandes, AI Solutions Engineer

This webinar is designed for AI specialists, data scientists, CTOs, and technology leaders looking to maximise the potential of LLMs in their organisations. Business leaders will also benefit from the discussion, especially on what the ‘art of the possible’ is on applying LLMs and on getting value from the Dark Data buried in your business.

This webinar builds on our previous Fundamentals of Large Language Models session. While not mandatory, familiarity with basic LLM concepts will be useful. You can watch a replay of Decoding AI: Session 1 webinarhere.

[here](/techtalk/fundamentals-of-large-language-models/)

Garima Dosi (Moderator):

Good morning, good afternoon, and good evening to everyone. I’m your host, Garima Dosi, very warm welcome to Onepoint TeckTalk. This is the second session in the webinar series, Roots to Fruits Decoding AI. Roots to Fruits being the journey of learning the fundamentals of the technology to a point where it can be used to solve, real time use cases and also bear fruits for us. And Decoding AI is specifically about, decoding LLMs under this concept of Roots to Fruits. The first session was about roots of LLMs, roots of Large Language Models, and the session today is about discussing the trunk of LLMs, the roots, being what is an LLM that we had discussed. And now we are growing into the trunk of how to use an LLM with the topic – Unleashing the power of Large Language Models – Direct Interactions. That’s the first part of this topic.

We have Gil Fernandes with us. He is an AI Solution Engineer and an expert in all AI related matters. And today he will be explaining about direct interactions and other techniques for using an LLM and, and how LLMs are used. Basically, how to use an LM using these techniques.

Some guidelines and information before Gil starts. The first one is that the PPT resources and a recording of this session will be made available to you after the webinar, so you can stay focused on what Gil says. And the second is, there’ll be a 15 minutes Q&A session at the end. You can keep posting your questions throughout this session, using the Q&A option, available to you. So without any further ado, I invite Gil to take on this session and take it forward. Thank you.

Gil Fernandes (Speaker):

Thank you very much, Garima. Let me start the presentation. This is today’s agenda. We are going to first look at some of the insights from the previous webinar – Fundamentals of Large Language Models. Then we are going to talk about how you can interact with Large Language Models. We are also going to talk about Natural Language Processing. NLP, for short and Large Language Models are actually very good in terms of processing natural language. So, this is quite a large, chapter. We are then going to talk about how you can extract structured from unstructured data. We’ll then also have a live demo of a product we built with the techniques, which are explained in this webinar. And, finally we’ll talk about dark data. We’ll just be touching upon the subject. There is an upcoming webinar about dark data, and at the end there is a Q&A session. So, let’s start.

LLMs are really, really cool or really, you know, they really made an impact because they are really great at some specific tasks. They have a great understanding of language. They’re very good for Natural Language Processing, which involves, big set of tasks. They can be trained for specific scenarios. You can really train the models to be good as chat bots or as models which follow instructions. They can be trained on a variety of Natural Language Processing tasks, like what I mentioned before, like summarisation, translation and so on. And they can also be trained to adapt to human behaviour to behave in a more human-like way.

But Large Language Models are definitely not perfect. Large Language Models, they have some flaws or shortcomings. They have limited reasoning, even though this is a very hot area of research. We are going to talk about reasoning in the next webinar actually how you can actually improve the reasoning capabilities of Large Language Models. They have one of the biggest flaws in my opinion is, missing sources or not being able to make proper citations. So, the models have embedded in their parameters a lot of knowledge, but they are not good, or they don’t do it. They are not able to track down the knowledge to tell you from where this knowledge is actually coming. Large Language Models also tend to hallucinate sometimes then to make up facts when they are a bit insecure. And sometimes they also refuse to give you ethical information based on some, misjudgement, let’s say. So, this is called refusals. And finally, all models, they have knowledge cutoffs. This means they know about reality about our world until a certain date, and then there’s nothing after that. So, these are the biggest shortcomings of Large Language Models.

Now to the main subject, let’s say. How can you interact with Large Language Models? The typical way in which we interact as humans with Large Language Models is through prompting. You can simply ask the models, a question. This is a very simple and very common use case. You can just ask a question and you expect an answer, and your prompt is just really this question. So we called it simple prompting or ad hoc prompting. Then there is one-shot prompting. One-shot is about giving one example. You have one question and you have one example, which comes as the context of with your question, or you can have multiple examples. It’s called multi-shot. And then you can perform variations on multi-shot, and you can add positive examples and negative examples. How does this look in practice? In practice, you have a question and then you instruct the model to react to this question in a specific way, and then to not react in a specific way. So you give positive and negative examples in a multi-shot scenario.

You also have context-based prompting. You get an external piece of information and you combine it with your question, and so you are potentially enhancing the knowledge base of the Large Language Model. Finally, you can also use some techniques, like using placeholders and markdown to highlight specific parts of your, question. For example, if you have code, then using markdown is really, really a good idea because you can specify with markdown, which is the code section, and which programming language, for example, you are using. Obviously we have here some techniques and you can obviously combine them and be really creative with them.

We have here a small poll, which we would like to, start now. If we could have the poll. It’s about what prompting techniques you are using. And, here are the techniques which I enumerated before. So let us know which prompting techniques you’re using. In the meantime, I’ll continue.

How can we interact with Large Language Models, typically they do not have a memory. If you just load, on your computer, a Large Language Model into memory, and then you start interacting with it, then you ask the model a question, it gives you an answer. And what happens if you ask a subsequent question, then with references to the first question or to the first answer, then the model won’t know what you’re talking about. If you use raw, Large Language Models, they cannot bridge the gap between, multiple questions. But obviously when we use Large Language Models with ChatGPT, obviously they use the recent chat history. What happened here is Large Language Model providers, they created a software layer on top of the Large Language Model, which allows the model to know about the recent chat history. You can then have a normal conversation with the Large Language Models because they will remember, the previous interactions, and you can refer to them. This is the recent chat history, which is baked into a software layer, which is typically used by ChatGPT and, Claude and all the other models, you have Large Language Model providers, and you also have custom instructions. Custom instruction are instructions, which are always sent to the Large Language Model on every interaction. And these custom instructions are really good to have a specific, way of interacting with the Large Language Model. Let me give you, an example. Here. You have this example on the right side, you carefully provide factual, accurate, thoughtful, and nuanced answers. You are brilliant at reasoning. If you think that you might not be correct, you say so. I’m using here a custom instruction which targets better reasoning and also, tries to fight against hallucination. When the model is not quite sure, I want the model typically to tell me I’m not really quite sure about these facts. Can you please check on the internet if this is correct. So, you can use custom instructions and recent chat history.

How can you really, you know, interact with Large Language Models at a higher level, let’s say. You can interact with these Large Language Models directly, just ask a question, get an answer, and then you keep on going like that. So that’s very simple. that’s a very, very simple workflow.

You can build a workflow around the interaction with the Large Language Model, and you can really build businesses around workflows. For example, Perplexity AI is such a business. They created a very simple workflow around Large Language Models, and they put a nice platform on top of it, a nice, user interface, mobile app, and so on. And then they have simply created a workflow around a Large Language Model. And the workflow goes more or less like this. The user asks the question, they perform a search on the internet, they combine the search result with the question, they send it to the Large Language Model, the Large Language Model answers with this extra context and gives a very detailed answer. And typically it also serves the sources. So what Perplexity AI did, they baked a workflow on top of a Large Language Model and they created a business around it. Today we’re going to talk a little bit about workflows, but not so extensively. We’ll be talking more in the next webinar about workflows.

Then there are also agents. Agents are a specific type of workflow, and agents are mediators between natural language and some underlying system. For example, we could create an agent which understands, language and then translates this language into database queries or SQL database queries, for example. Agents are like mediators between natural language normally and some systems which can be, of a wide variety. Typically the agent has a loop, which is a workflow with a recursive loop, which breaks when you have a solution for the problem or when you fail. And agents also always have tools which enhance the capability of the Large Language Model. And the main intelligence unit of the agents is always the Large Language Model. Today’s webinar is not about agents. So we have a webinar dedicated to agents.

Finally the last type of interaction we have are agent ensembles. In here you grab a team of agents and define how they interact with each other, and you can then simulate environments using multiple agents. Here on the right side, I have, and a small example of a very, very simple agent, an, agent ensemble, sorry, it’s an agent ensemble, which has three agents, a supervisor, then it has, this regular SQL validator and the numeric SQL variant, which are just agents. And this is an agent ensemble. These are multiple agents interacting with each other also in a predefined workflow. We are not going to talk about agent ensembles today. That’s also, subject for a future webinar.

Now I would like please to have the audience insights to check how you are prompting. Most people are using ad hoc prompting. I was expecting that that’s normal, but lots of people to my surprise are using context-based prompting. Kudos to our listeners. It seems that they are really enhancing the, LLM capabilities with some extra context. And then some people are using one-shot. In the third place, we have one-shot prompting, which is really, really also great. Yeah, it seems that, not many people are using placeholders in markdown. And then perhaps there are other techniques which I don’t know because there’s some people here in the audience who actually don’t have an idea about how they are prompting. Cool, thank you very much. Let’s continue here.

Natural Language Processing, Large Language Models are trained to be either chat bots or to follow instructions to be the same kind of a digital servant, let’s say so and, both tasks require impressive Natural Language Processing skills.

Let’s look at some of these, Natural Language Processing skills. Let’s start with translation. It, this is, this one is quite easy to understand. Large Language Models are able to translate from one language to another, like from English to Chinese and to or to German. And they are more flexible than, than your, Google translate probably because you can translate into multiple languages in one go. So for example, I have your prompt where I just said, I hear some text, which is my context, let’s say so. Can you please translate it into Chinese and German so it can do it right away? They are in a sense, more efficient than the regular translation tools because you can just say, translate this into 20 languages, and it’ll do for example, yeah, so this is like a little bit the beauty of this Large Language Model, because they’re really, really so flexible.

Then they are also capable of summarising and, not only summarising, but you can also summarise in different ways. You can summarise from one language to another. You can combine the idea of summarisation with some other, capabilities of the model. So, there’s a lot you can actually do here. You can for example, tell, please summarise in two sentences, 3 sentence, 4 sentence, 5 sentence. You can define like the length of the summary, for example, with this Large Language Model. They’re really, really great at summarising text.

Then of course, you have also single or multi-turn dialogue. This is quite clear what this is, you can really have a conversation with them. These models have been trained for this. You can ask questions like, what is the capital of India? That is Delhi. And then you ask a question with a reference, with a logical reference, and they will, figure it out, which are the neighbouring states of Delhi, of its neighbouring states. It’s not explicit. And then it comes up with an answer.

They also very good at zero-shot classification. Why zero-shot? Because there are no examples in this classification. You can just say, can you please classify this text according to different, categories like arts of, politics, science, sports or whatever. And then you give a context, which is some extra text, and then it’ll classify to give you, for example, if you say so, it’ll give you the probabilities, of the text being associated one of these categories. This is also interesting for later when we are going to talk about extracting structured from unstructured data.

Some more NLP skills, Natural Language Processing skills. We have sentiment analysis. Sentiment analysis is about determining the sentiment of some text, whether saying, if this text is a negative tone, a positive tone, a neutral tone, or so on. And the interesting thing here is that you can extend the sentiment analysis capabilities of Large Language Models when you provide some context and you provide some multi-shot prompting to the Large Language Model. I have an example of how to do this later on, so I won’t explain it too much now. Let’s keep this in mind that we are going to talk, later on about sentiment analysis about, advanced usage of, sentiment analysis.

Large Language Models are also very good at named entity recognition. Named entity recognition is about recognizing entities in specific semantic contexts. For example, you asked the Large Language Model. Can you please extract all the locations from this text, all the personal names from this text, all the political parties from this text, all the, car brands in this text. This is really great if you want to structure unstructured data. Again, just, I’m looking forward to that chapter. This is one of these capabilities which you can use in that context.

You can also use parts of speech tagging. This is better for linguist to be honest. but you can actually, find out in language, what is a verb, what is an objective, what is a noun, a personal noun, blah, blah, blah. So you can just, extract the parts of the text and tag them. And this might also be useful if you want to structure unstructured text.

More NLP skills. You have keyword extraction. Now, keyword extractions, models typically are quite good at this, but if you don’t specify, very clearly what kind of keyword extraction you want, you might get different results. I tried this on, Llama 370b a bit old now, the model, let’s say so, but it extracted the keywords, but then I tried it on Gemini. Gemini does it in a different way. For example, it gives you the keywords and the definition of the keywords. so very often, it’s important to have very specific prompts and tell the models, I want to extract keywords in this way. And then you give a couple of examples, and then you get much, much better, end results. Otherwise, models like you can see, they can interpret your, prompt in different ways.

Language generation, Large Language Models are really great at this. You can ask them to generate text, and they are really, really very proficient at this. They do it very fast. You can, generate, mails, you can generate poems, you can generate cooking recipes. You can generate, complaints. You can generate a lot of stuff. And then they can also do it in many, many, many styles. For example, I have here one, example, can you please generate a sonnet? Actually, I misspelled it. They are also capable of forgiving your typos in Shakespearean style on how Yoda deals with the Monday Blues when he comes to the office. Then it generated a sonnet about Yoda, which I’m not going to read right now.

They’re also very good at, finding out missing pieces of text, or they are also very good at replacing pieces of text. For example, if you want have a text and you don’t like a specific formulation of the text, you can use this Large Language Model to say, I have your word. Can you replace it with a synonym? This is not only about, mass language, but it’s also about, you know, finding synonyms, making replacements to text. So, re-engineering your text. They are also very, very good at that.

Lots of, NLP use cases here. But now I wanted to present one Natural Language Processing business use case, so that you actually understand that you can not only use this NLP capabilities, but you can also combine them in very, very creative ways. In this example, we create a prompt to translate, summarise, and extract main ideas related to competitiveness and innovation of the text in German. You are basically combining multiple NLP capabilities in one single prompt, and the models can really deal with this so they can summarise, translate, and extract nouns. They can obviously do this in, do all of this in one go. And here I have, a prompt on the right side where it actually says, the text discusses the importance of artificial intelligence, in the BMW groups strategy and operations, and so on. Now this is the summary, but the prompt is the most interesting thing. Sorry. Can you please translate the following text to English? So first, it’s, you have, translation, then you have summarisation, and it then extracts the main points regarding the competitiveness. You can combine multiple NLP capabilities in one single prompt, and it’s perfectly fine. These models will be able to deal with it. You can actually do things that are much crazier than this, actually with Large Language Models.

This is another NLP use case. And this one is related to sentiment analysis. In this case, you have, a prompt which tries to determine the confidence level according to some rules, which I define myself. And then, so this prompt has three parts. The first part is just, the broader instruction, which is just determine how confident you are in terms of giving advice to a customer based on a sequence of questions and answers that you can find here. And then I have a specific context that gets injected, which is just a questionnaire, and then I explain the rules of the game. I explain, the confidence levels are outstanding, high, medium, mediocre, low. This is like the rule set. I specify a rule set in this prompt, and then to make things really clear for the model, I used multi-shot prompting to exemplify how these rules can actually be applied. In here, I created my own sentiment analysis kind of categorisation system, just by creating a prompt. The prompt has like three parts instruction, then the rule set, and then the examples on how to apply that rule set and imagine what this works. This is really cool stuff, which you can actually, use in Large Language Model. It works very well with ChatGPT at least.

Let’s look at this chapter. And this is particularly useful in the enterprise because enterprises have a lot of unstructured data, and they want to find patterns in this unstructured data so that eventually they can use these patterns in their reporting. But anyway, let’s, stop here and let’s talk about the types of data which enterprises typically have. They have structured data, they have unstructured data, then they have data, which is kind of in between, which has some structure.

What is structured data? This is the data which you have in your Excel sheet. This is data which you have, for example, in databases. This is also the data you have in other storage systems, like, for example, Neo4J or something like that. Neo4J, is a graph-based kind of database, but it’s also structured data. Most of the enterprise, run algorithms used by enterprises to calculate stocks and whatnot. They use this type of data. And so most of the governance of businesses is supported by this type of data. This data is extremely, extremely valuable for enterprises. And it’s the most important type of data. Typically, enterprises want to have a lot of structured data, and not a lot of this type of data, which is unstructured data.

What is unstructured data is, for example, transcripts of phone calls, emails, server logs, or images captured by CCTVs or images of, products, on the webpage, whatnot, or audio files, voice recordings or even videos captured by CCTV again. This data typically doesn’t have really some kind of structure, and it’s hard to consume by regular, algorithms used in the enterprise. Typically what you want is actually to convert unstructured to structured data.

Finally, there is also some types of data which are like in between like sensor data from cars, which is captured over time. So, it has some time coordinate in it, but, otherwise it’s not very structured. Spatial data typically also has coordinates like latitude, longitude, and so on. And then there is also rich media 3D models, which typically has some structure because they have all these points in space and, and shapes and so on, but they might not be fully, structured.

Large Language Models have powerful NLP skills, like I mentioned before, and these skills allow to convert unstructured into structured data. Let’s look at some problems which are there. We already talked about, you know, extracting keywords or, performing sentiment analysis. It’s clear that there are some structural capabilities in Large Language Model, but there are also problems when you try to structure the data with Large Language Models. Classical Large Language Models are trained as chatbots. They are very chatty, so they, they try to create a good atmosphere. They create, they try to be nice to you and pleasant and so on. And sometimes when you want to structure data, you just want the data. You don’t want any fluff around it. Like, you don’t want the chat bot telling, you ask for some keywords in some text, and then the Large Language Model telling you, yes, of course we can extract all the keywords you want, and here are the keywords by the way, and have a very nice day at the end, and so on and so on and so forth. You don’t want that fluff because typically when you want to structure unstructured data, you want to, just have the data and, nothing around it. And this is this, chattiness or this, extra extraneous conversational style of the Large Language Models stand in the way of this task, specifically if you want to create scripts, or you can want to create software which performs these tasks automatically.

In order to tackle this problem of chattiness and, you know, this kind of fluffy, style of responding, OpenAI released in June 2023, function calling and function calling allows, the callers. So typically this is more for software developers, let’s say so to specify an output format. And this output format comes typically in a structured format. And this avoids, you having to, you know, removing the fluffy chatty parts and, extract them out of your, results out of the output of the Large Language Models.

Let’s see how function calling actually works. Function calling allows you to specify the output format, like I said, and it was introduced by OpenAI. But, nowadays lots of other model vendors support function calling. So this feature really became very popular, and you have lots of models now supporting this feature, including, lots of open source models.

How does function calling work in practice? So here is an example, in this example, we have some, text and we want to extract relationships and, term definitions from this text. So, in essence, it’s more like we are trying to create an ontology from a specific text, and I have here a prompt. In function calling, the first thing you need to define is a prompt with instructions. And the instructions here are extract an ontology, do not draw it, but create a markdown table of relations with three columns in this order source target relation name, and also create a list with three columns. The first contains the term name and so on. And then I give a very detailed, instruction on how to create this list of relationships. Then in step two, the format is specified. Now, this is a technical format. This is in a format called JSON, and it specifies how the output should look like. Here we specify, that there is, a relationship stable, and there is also, well, a term definition stable. You don’t see it here, but it’s also there, it’s a bit cut off here. But anyway, you specify the output format. This is a different type of interaction with Large Language Model. You specify the instructions, which is a prompt, basically. And then you specify the format. And then the incoming JSON message, which you receive is typically in a structured format. And this is really great for anyone who wants to write some software, some scripts, or some automation. Then you can just simply just extract the data naturally, I mean, in an easy way, and just save the data in a regular database.

We have talked about lots of techniques, and we tried to create some software tool which uses most of these techniques. And so, we have created a tool called the D-Well tool, and just, I’m just going to switch to it. Hold on, gimme a sec. I just need to switch to the right window. Let me see if this is visible.

We created this Data Wellness tool, which is supposed to be an AI consultant, an AI data governance consultant that asks you an initial question and then tries to understand your problem via subsequent interactions, understand it better and better and better until it feels confident enough to give you some advice on how you can mitigate your problem. And in this tool, you can see that we are using, lots of prompting techniques and also lots of, tricks around, sentiment analysis to have it running. I’m just going to answer this question. Which area of your data ecosystem are you most concerned about? And I’m just saying compliance and security risks. So compliance, this is mostly about, GDPR and not being compliant with GDPR and such laws? In the US there are different laws of course, in this area.

And, after, you know, answering this question, it generates another question. And this question is, what specific compliance and security risks are you currently facing in your data management process? So it wants to know more about, your problems, and I can click on one of the suggested options here. We are concerned about the data breaches because this is quite a big thing, but I could also say we are facing challenging meeting regulatory requirements. This company would have a twofold problem in this area, and it’ll generate the next question. So right now we are communicating with ChatGPT to generate the question.

And again, another question, what measures do you currently have in place to prevent data breaches? So, it wants to know more now about the data breaches, because in the previous question I mentioned data breaches. I can say that we’re using some form of encryption. Let’s see if picks up.

Then the other topic, which was mentioned in the second question, how do you currently monitor and audit access to sensitive data to ensure compliance with GDPR or CCPA requirements? So, you see very nicely that I mentioned two problems in step two, and in question three it addressed one problem, and in address four, it actually addressed the other problem. And I tell you, this is a live demo so things might happen. It just did this without me. This is not a video, basically. This is not prerecorded so many things can happen, like connection error.

And then it generated a fifth question, what specific challenges are we encountering in maintaining data quality while ensuring so, I think it’s repeating itself a little bit here, but I think it’s still okay. So, let’s see where it goes next.

It’s already generating the report because the confidence level of the tool seems to be relatively high right now to give the report. So, I hope you remember one of the techniques which we used before, which was about sentiment analysis. And the prompt, which I showed in the presentation, is exactly the prompt I’m using in this tool to determine how confident the model is. And the model will give you some recommendations which include, implement a comprehensive data governance framework. This means that make sure that you have data governance rules in place that includes clear policies and procedures for data handling, access controls, and compliance with regulations such as GDPR and CCPA. I think CCPA is for the US and so on.

It gives you a set of advice to mitigate the problem which you mentioned before which was initially compliance and security risks. So you can go back and forth in the interaction here and it’ll tell you also which confidence degree it actually has. It is good, it seems to be confident about the advice he’s giving. And we also created a knowledge graph. So, this is just a graphical representation of the content of the advice, and it gives you an idea which are the topics which are the most relevant. So, we played also around, with, knowledge graphs. And in order to create a knowledge graph, we are also using one of the prompts, which you have in the presentation, which is showed before.

Anyway, I’m going to switch back to the presentation now. I’ll stop sharing this one, and I need to switch to the presentation back. Lemme see if I make it right. I hope it’s being displayed. It’s taking a while. Great. Fine.

This is the technical concept around this tool. As you can see, it’s a bit confusing here, but, I can explain. The user ask the question, no, the user doesn’t ask a question. This is the other way around. The tool asks the question, initial question, and this question comes with suggestions. Then the tool answers the question using ChatGPT, but when it generates, no, sorry, I’m messing up things here, first the tool asks the question, then the user answers the question. Then there is another question which is generated. And this question is generated with help of some knowledge base. Then the tool, checks, if it is, time for giving, some, report with advice. If it is not the time to give, a report, then it, enhances, it generates another question. We are generating another question. The question is asked to the user. Now, there is an evaluation of the confidence to give advice, and then the confidence is sent to the client, and the answer is also sent to the client.

So, basically we are having here a loop of questions being generated, answers being received, confidence being reevaluated, and when we reach a certain amount of questions and a certain confidence level, then we exit to the advice. And at the end, we also generate a knowledge graph.

The last topic for today is dark data. We, at Onepoint are very interested in dark data, and for this reason, we are going to have an extra webinar, exactly on this topic with my colleague Allan. But I am going to touch on this topic as a preview. What is dark data and why are we talking about dark data in the context of Large Language Model? Dark data refers to vast amounts of information which organizations, enterprises, businesses collect over time. And this data is not used for other purposes. Dark data is related also to this kind of concept of the data graveyard. This data, which is sitting somewhere in some, servers, you know, and no one is actually using it. And dark data has actually potentials and these potentials are not being tapped into. And also, dark data might have risks because you might be, gathering information regarding to personal information, and you might be breaching laws by storing this data somewhere on some dark server

Dark data can be used to gain insights on how you can optimize business processes. It can help you with anomaly detection and fraud detection too. Very often the server logs, if you process the data properly, you can figure out that someone is trying to breach your servers. And like I said, dark data might also contain data, which might violate laws like GDPR.

Now, I would like to have a second audience poll around dark data. And, the question is, what dark data do you have in your company? Do you have server logs, CCTV footage, recorded phone calls from help desk and so on?

How can you deal with dark data in an enterprise? This requires a multi-step approach. First of all, you need to identify and discover where you have the dark data typically, and then you need to classify the dark data and you need to organise it. Then you need to define who is actually responsible for which parts of the dark data, who, for example is also responsible for deleting the data which should not be there. And you need to define some data governance policies around dark data. You have to have this initial phase when you are dealing with dark data, identify, classify the dark data and define a data governance framework around this dark data.

When you then have finished the planning phase, you can go on to the technical implementation, and then you can start automating, data-driven processes around dark data, or you can then use AI and ML to also extract to structure unstructured dark data. And so we, at Onepoint, we really think that LLMs have brought a lot of new power into the technical implementation part when you’re dealing with dark data. And that’s also why we actually mentioned, dark data in this webinar, because we really truly believe that right now it’s much easier these days to deal with dark data than it was perhaps like 5, 10 years ago, because these Large Language Models are so powerful. And there are Large Language Models, but there are also MLLMs, which are Multimedia Large Language Models, which can extract information also from images and videos. So, you could also use this in the technical implementation.

Then after automating and using LLMs and MLLMs to structure unstructured data, you need to integrate all the insights into your reporting workflows. Obviously, this will generate enhanced reports and the users and the business decision makers who are using these reports, they need to be trained on how to use these new reports or these extended reports. You need to promote data literacy at the end, so you need to train your users. That is basically the type of process which we advise customers to go through when they are dealing with dark data. But like I said, there will be a fantastic webinar with Allan, I think, it’s coming up. Just check on our webpage and he will go into dark data in much greater detail.

I just would like to have the audience insights on the second poll. Server log seems to be the most popular type of dark data out there than CCTV footage. And SMS communication, interestingly, it’s very interesting. It seems that lots of business users here are accumulating SMS communications. SMS is typically very expensive form of communication. But CCTV footage is also there, that’s really great. So, thank you very much for that.

And now we reached more or less the end of our webinar. I’m just thanking here, Perplexity AI, which inspired me a little bit here. Gemini, ChatGPT, Claude, Mistral, Together AI, and of course Wikipedia. So, credits to all of them. And now I would like to start the Q&A session. Garima to you.

Garima Dosi (Moderator):

Yeah, thank you, Gil. Thanks for the wonderful session. Information was really helpful. And the live demo was all the more interesting and as it display the capabilities of LLMs and how they can help and how you’ve used the prompting techniques there. We have got a couple of questions, maybe let’s see how much we can take. The first question is, when prompting LLMs, what is the ideal balance between open-ended questions that encourage detailed responses and specific questions that guide the LLMs output towards a particular direction? So how do you balance between questions so that you don’t get, you know, so that the questions are neither too broad nor overly restrictive and balance is maintained in open-ended responses and then the specific responses.

Gil Fernandes (Speaker):

So this is, how to create this balance between open-ended responses and instruction giving. Typically you need to know really what you want to have. I mean, what is open-ended? Open-ended would be for me, I generate a poem about something or generate some text about something, be creative this is open-endedness. And if you want to be specific, you are giving instructions to the model. So, the models, they can be creative on one hand. On the other hand, they are servants which follow instructions and they are actually quite good in both of these tasks and you can also combine these tasks. So how do you find this kind of balance? I think it depends on, on what you want to achieve with the model. Do you want to have something creative? Then you have to go for more like creative style and open-ended type of prompts, like generate, then typically use words like generate, but then if you want to combine this generation with some instructions, then you need to be very specific about these instructions.

I think you have to think in this way. If you wanna find a balance, you have to have a good idea, and then you have to have one part of the prompt, which is about generating and being creative. And then you have to have a part of the prompt, which is also very clear, but separate from the first part, I would say, which gives instructions on how to give. I’ll give you an example of, of this idea. So I say ChatGPT, can you please generate a poem about Yoda’s blues on Monday in Oscar Wilde style? Can you generate a poem? This is the generative part, and then the instruction part of the prompt will be can you please extract the main keywords of the poem that you generated. So, you can try out these kind of things, right?

But yeah, actually here I have separated the prompts. So it’s very clear what is generational and creative. It’s very clear what is the instruction part. I suggest really, if you wanna find a balance, be very clear about what is to be creative and what is to be an instruction, and be really very explicit about this. And then I think you can combine both parts, the creative part and the instruction following part.

Garima Dosi (Moderator):

Great. That makes sense. Similar to this one, there’s another question which says, there are so many different prompting techniques but then how do you decide when to use which technique? Can you give some guidelines how to implement prompting effectively?

Gil Fernandes (Speaker):

I think, there is one thing which is always important in prompting is to be clear about your intentions. So normally I adopted this practice of having imperative sentences at the beginning of the prompt like please extract an ontology. Not please in, I would just go actually, extract an ontology just right to the point. And then you, so that’s the most important part. So be clear, be imperative about what you want. If you’re doing instruction based prompts or creative based prompts, you should, in both cases, actually be imperative and clear about your intentions from the onset. The first sentence you write in the prompt, it should actually be clear cut. And then you start going into more details. Now, for example if you want to generate something and you want to give an example, that’s great because actually you are helping the model in the generation. You are defining the style of the generation. So, you could use one shot prompting multi-shot prompting if you want to really have the output in a specific way. But this is I think in prompt you have multiple phases. The first phase is just setting the scenario, setting the intention, be really clear and explicit.

The second is actually refining the idea. And when you refine the idea, you start using one shot or multi-shot prompting. And if you really are doing something which is very complicated, then you can also use these techniques which we mentioned before. You can use multi-shot prompting but with some positive and negative examples. So saying, you should, you should generate in this way. Look at here, but not in this way. Look at this here, I don’t want this, you could also do that. So in essence, what is really important is that you create some kind of strategy for yourself, but I think the strategy which works best for me is really be very explicit in the beginning and then start using different techniques to obtain more refinement and better results from the Large Language Model. I hope this makes sense if you structure your prompts in this kind of way.

Garima Dosi (Moderator):

So, the next, question is also about formatting of the prompt. So, sometimes the formatting of the output varies from one answer to the next. How can I use say a word file as an example of the formatting to use. So basically an example in the word file, and then the format should be according to the word file format. How can you do that?

Gil Fernandes (Speaker):

So basically you want to generate some text from the Large Language Model in a specific format?

Garima Dosi (Moderator):

Yeah a very specific format, but the format may vary.

Gil Fernandes (Speaker):

The answer for this is actually use examples and use as many as you want. Multi-shot prompting, that’s it. First be explicit about your intention. I want to generate an essay about the use of solar energy in the UK, something like that, whatever. And then, you specify your intention. And then I need you to create a report with a title, a subtitle, a short summary, and then the expanded ideas.

And then look here for this example and then you give an example to the Large Language Model. And if you want, you can give a second and a third and a fourth. If you do that, the results will be much better than by just saying, generate some essay.

Garima Dosi (Moderator):

But then as a format, can you also use a word file in there? Like something like a Word?

Gil Fernandes (Speaker):

No, obviously the thing is that Large Language Models probably won’t understand the raw Word file. And that’s something that you need to kind of convert into a format which the Large Language Model actually understands. Now there are converters which can do this kind of, how do you say, translation, but that’s a little bit of a separate topic because Large Language Models, they understand plain text, right?

Even though they then convert it into tokens and then inside of the Large Language Models then they transform it into canonical geometries. But that’s a different story. But the thing is that Large Language Models don’t understand Word files as such so you need to have a conversion layer between the Word file and normal text. So, you need to have some piece in between if you want to do this conversion. Now there are some providers which provide this piece in between, but I actually would need to look at that.

Garima Dosi (Moderator):

Thanks Gill. That was useful. Thank you all for joining us today and thanks Gil for the wonderful session. Please do contact Gil with any queries or feedbacks on this session. He is available via email attechtalk@onepointltd.comand onwww.linkedin.com/in/gil-palma-fernandes.  And if you want to read about what Gil has written on AI, you can go tomedium.com/@gil.fernandesand through his blogs.

[techtalk@onepointltd.com](mailto:techtalk@onepointltd.com)

www.linkedin.com/in/gil-palma-fernandes[6]

medium.com/@gil.fernandes[7]

A recording of today’s session and presentation with all the material as already mentioned would be available to you on our websitewww.onepointltd.com, the link which will be sent to you post the webinar.

www.onepointltd.com[8]

And also we would like to start reaping early fruits on this journey of Roots to Fruits. So a session about applying AI on dark data as Gil also mentioned, is coming up soon where we we’ll also discuss how some real use cases have been solved using this dark data. And it would be a very interesting session. So, request all of you to register for this.

And also, the next session we would be exploring the branches of LLMs in part 2 of this topic. Unleashing the power of LLMs this time through workflows and complex interactions, both being very interesting topics.

Hope to see you all in these webinars again. And, bye for now. Thank you all.

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
[6] www.linkedin.com/in/gil-palma-fernandes: http://www.linkedin.com/in/gil-palma-fernandes
[7] medium.com/@gil.fernandes: https://onepointconsulting-my.sharepoint.com/personal/blessy_athisayamani_onepointltd_uk/Documents/medium.com/@gil.fernandes
[8] www.onepointltd.com: https://www.onepointltd.com/
[9] Gigaspaces: https://www.gigaspaces.com/

## Metadata

- URL: https://www.onepointltd.com/techtalk/unleashing-the-power-of-large-language-models-direct-interactions-replay
- Last Scraped: 2025-03-06 15:55:18
- Content Type: Web Page
