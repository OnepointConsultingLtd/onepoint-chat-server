# The future of enterprise data access — Webinar — Onepoint TechTalk | Onepoint - Do data better | Innovate with AI & more | Architect for Outcomes

Source: https://www.onepointltd.com/techtalk/the-future-of-enterprise-data-access/

*Onepoint - Our experience helps to solve questions related to on-prem or cloud; data strategy or governance; data engineering or analysis, delivering the best possible outcomes. Doing data better.*

## Content

- Architect for outcomes
- Do data better
- Innovate with AI & more
- 
- 
- 
- Search for:Search

Architect for outcomes[1]

Do data better[2]

Innovate with AI & more[3]

Home[4]

Onepoint Techtalk[5]

## The future of enterprise data access- RAG, GraphRAG and beyond

In this session we will explore cutting-edge enhancements to RAG, shaping the future of business automation, data analysis, and customer engagement.

This event was livestreamed and recorded

- The basics of RAG (Retrieval-Augmented Generation)and its potential for transforming business processes
- How to enhance RAGfor greater efficiency and impact
- Knowledge Graph and RAGs – GraphRAG
- Incorporating enterprise knowledge into LLMs

This webinar is the 5thsession of our Decoding AI Series. While not mandatory, familiarity with basics of LLMs will be useful. You can watch a replay of all the webinars of Decoding AI Serieshere.

[here](/techtalk#replay/)

This webinar is designed for AI specialists, data scientists, CTOs, and technology leaders looking to maximise the potential of LLMs in their organisations. Business leaders will also benefit from the discussion, especially on what the ‘art of the possible’ is on applying LLMs.

[cky_video_placeholder_title]

Garima Dosi (Moderator):

Good morning, good afternoon to one and all. Welcome to the fifth session in the webinar series, from Roots to Fruits, Decoding AI. In the last couple of sessions, we have covered the Roots, which is the fundamentals of LLMs, and then the trunk, which was about directly interacting with the LLMs. And one Trunk can make way for many branches. So, from direct interactions to indirect and workflow interactions. We had gone through one such branch, which was interacting with LLMs, not directly, but using workflows. And today we are here to explore another branch of the workflow interactions, which is called RAG, Retrieval Augmented Generation. This is a technique, which is going to be really useful for enterprises in the coming years.

And so, the topic of discussion in today’s TechTalk is “Future of enterprise data access – RAG, GraphRAG and beyond”. So, as always, our AI solutions engineer, Gil Fernandes, is here, ready to deliver the session. He has a lot of experience of building applications using RAG and is going to take us into a deep dive of RAG its usages and its implementation. So, I welcome him on board. Welcome, Gil.

Gil Fernandes (Speaker):

Thank you very much.

Garima Dosi (Moderator):

Before we begin, as a formality and as an information, just wanted to convey that the resources of this webinar would be shared at the end of the session. You can sit back and use your brain power, all of it to grasp all the knowledge, and from now I’m passing the control to Gil.

Gil Fernandes (Speaker):

Hello. Thank you very much Garima. This is today’s agenda. So, we are going to talk about the previous webinars and what we discussed there. So, let me, show the presentation first. We are going first to talk about the, what we discussed in the previous webinars or what we covered in the previous webinars. Then we are going to really see what RAG is, what Retrieval Augmented Generation really is in its simplest form. We are then going to discuss how you can use Retrieval Augmented Generation in the enterprise. Then we are going to talk about how you can actually evaluate RAG, because if you build such a system, you need to have some kind of metrics to evaluate it, to see how well it is performing. Then we’ll talk about, different form of Retrieval Augmented Generation, which combines knowledge graphs with Retrieval Augmented Generation, which was initially developed by Microsoft. And finally, we will look beyond, these types of systems. And we’ll also, touch a little bit upon the latest research in this area. And after this, we’ll have a Q&A session. So, this is the content of our webinar.

Before we start and we dive into the content of the previous sessions, I would like to have this poll. And the question here is, how are you accessing your documents in your company? Not, your private documents. So, is it in paper format? You use a lot of documents in paper format or in electronic format, or do you use a portal like SharePoint or something like that? Or are you already using AI based tools like chatbots to access your information? Or are you using specialised software like ECMS type of software or, do you really use document databases to a certain degree, like, NoSQL and, other or graph database like Neo4J for example. So, I’ll let you, work on this.

In the previous webinars we discussed about Large Language Models and that they are suited for many, tasks, but they are not so, good at others. Typically, these Large Language Models are really quite generic, they can do a lot and some tasks they perform very well. Some of the tasks they’re not very good at. So, they are great at the variety of Natural Language Processing tasks, which includes summarisation, translation, keyword extraction, and many other tasks. They are also, very good, at, converting unstructured data, like, for example, extract meaningful information from log files, for example. They’re very good at that. They’re also, very good at even doing tasks related to OCR, which when you have an image, this image has a text, you want to extract the text. They are very good at that. Because of these capabilities of converting unstructured data to structured data, they are also, very good at tackling the problem with dark data.

Now, I’m not going to cover dark data in any form or shape in this webinar because my colleague Allan already, covered it in the previous webinar. So, I request you, if you’re really interested about dark data, there is a webinar on our webpage,onepointltd.com. So, just check it. And, finally, also, Large Language Models are very good at learning from context. So, if you give some, piece of text to it and you ask questions about this text, they will very often, they will give you, very good results So, they can work with context really, really well. And this capability is very important for today because, the Retrieval Augmented Generation system builds on this capability of learning from context.

onepointltd.com[6]

Now, what are the drawbacks of Large Language Models? The drawbacks are, they are not very good at reasoning. They are improving there. So, we talked about this in the previous webinars. So, if you want just go to our webpage again, there is a webinar. My previous webinar was really about reasoning. Most of it actually, then they have knowledge cutoffs. They know until the world, until a specific data and it’s over. They are not very good at long-term planning. This is also, related to limited reasoning. So, if you have a very complicated, reasoning plan, they might just, you know, lose the plot.

Typically, when they give you answers about some knowledge, they won’t tell you from where the knowledge came. Did the knowledge come from YouTube? They won’t tell. You might come. And they sometimes just make up things on the fly. And finally, they might also, refuse to give you, knowledge about, some topics, because they have ethical constraints and the ethical constraints are kind of, they are there, and they don’t allow you to access this knowledge. But the ethical constraints sometimes are, misinterpreted by the model, and then it comes to a refusal. You, you might ask the model for something which is completely legit. They say, oh, no, I can’t give you this information. This is too dangerous for you. So, that’s also, a problem that these types of models do have.

So, I just would like to see the results. I know it didn’t take long, So, if you’re still on it. So, in paper format, there’s still, some of our, some of the members of our audience are using it. And, but in electronic format, most of the documents used are definitely in electronic format. Many members of our audience are using documentation portals. And funny enough, no one is using an AI based tool here, which is kind of interesting. In document databases are only being used by one person here, so, that’s very interesting. So, it means that electronic format wins and then, documentation portals is second. Great. Thank you very much because I want to have this question because we’re talking today about RAG systems, but if you look at it, we are talking about information retrieval, really. So, that’s kind of the, the big topic behind also, this, webinar.

So, what is Retrieval Augmented Generation? Retrieval Augmented Generation is, a term which, appeared and it was introduced into 1921. So, extremely recently, like 3 – 4 years ago. And it was introduced in this paper here withRetrieval-Augmented Generation for Knowledge-Intensive NLP Tasks. Before that, this term was absolutely not popular at all, and it was also, kind of created this idea of Retrieval Augmented Generation because of the increasing popularity of Large Language Models. The paper, actually, I just picked up, some quotes from the paper, and it actually states that for language generation task, we find that Retrieval Augmented Generation models generate more specific, diverse and factual language than a state-of-the-art parametric only sequence to sequence baseline, which means actually these systems perform better than a plain Large Language Model. So, that’s in, in general speak, that’s what it is. So, RAG systems, actually they perform better than just using directly to the Large Language Model.

Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks[7]

And why do we use Retrieval Augmented Generation? Like the name says retrieval. So, we use some kind of search engine augmented, So, we augment the question with some search result, and then we generate something, So, in this name, you have more or less how the system works, but I’ll explain a little bit better.

What are RAG systems really good for Large Language Models? They typically lack some knowledge, like I said, like recent knowledge or specialised knowledge. Knowledge is, which is only available to your enterprise. And very often they cannot answer queries. Now, here on the right side, I asked, the question to ChatGPT a while ago about, specific scientific paper and, ChatGPT, did not hallucinate, but said, I don’t know much about it. So, in this sentence here, you notice that it doesn’t know much about it. It’s possible that the paper you’re referring to was published after my last update, and is, or is not widely disseminated in mainstream academic channels. It is actually, but the problem here is the knowledge cutoff of ChatGPT at that point in time. So, didn’t know about this document. So, this is a very typical problem you have with Large Language Model, and you can overcome this problem of not knowing with, RAG systems.

So, this is in this slide. What you have here is, workflow of a RAG, how it normally works. So, in a RAG, you want to retrieve information, that’s your main goal, and then you want to get an answer. And these answers should be complete, should be accurate, should have no hallucinations, and, it should be also, well written answer, not just a link to a page or something like that.

How does this workflow works? The first step, the user asks a question in the second step. This question is converted into, so-called embedding into some format, which is understood by the search engine. And mostly, we use a vector database as the search engine, which is very good at looking up similar documents. So, this vector database retrieves the so-called embedding, or it is a vector, it’s a position in multidimensional space or position in latent space, let’s say so. And, this is like, instead of having like, a position in a two-dimensional, three-dimensional space, you have a position in a thousand-dimensional space, and then it looks around this space. So, it uses some, distance, a specific type of distance, and this can be a UCLE distance or Manhattan distance or, some other type of distance. And then it, tries to find all the documents which are surrounding this or are near to this, point in space, and it reduce those documents. But in essence, what does it do? It actually gets the answer and finds all the documents, which are similar to this answer. So, that’s in essence what, what happens here. Then the answer, so, the context, so, the answer of the search or the result of the search is combined with the question or the initial question. And this is just text. So, you build a prompt with this. And this is sent to the Large Language Model. The Large Language Model then has a question and has a lot of information about this question, and then, uses its contextual capabilities to give a much better answer, and then it sends a result to the user. And that’s it. That’s the basic RAG.

If you understand this, you understand, like the core, workflow of Retrieval Augmented Generation system. So, there are three involved components, Large Language Model, vector database, like I said, vector database. It could be something else. It could also, be, conventional database, could also, use multiple search engines if you want. So, we’ll talk about that later. But this are just, enhancements to this, type of workflow.

I hope this workflow is kind of makes some sense. And remember, the main goal of RAG is actually to give you better answers or to give, answers about specialised knowledge, and also, to give you answers that have citations that can cite the knowledge. For example, you can say it comes from, for example, if the Large Language Model, replies, you want the Large Language Model, not only to give a nicely formatted, well written, answer, but also, to tell you this comes from this and this and this, document from this and this, and this page. So, you also, want to have that.

And now, the RAG there in RAG, there are two workflows. One is the operational workflow, which I discussed before, and then there is the indexing workflow, which is just about, inserting the content of your knowledge base into the search engine.  and this is exactly this workflow. In this workflow which is typically an automated workflow. There is some kind of software which reads a file, then it has to cut the file in, in chunks, and then it cleans the text from, eventually elements which are not So, interesting for you. And then, it connects to a so-called embedding model, typically. And this embedding model is also, a variation of a Large Language Model, but it gives you the vector representations of the text. It gives you embeddings. And so, it converts these chunks, these file chunks into these vectors, which are really like just lists of numbers, but this list of numbers represent points in multidimensional space. And then these representations are typically stored in the vector database together with some reference to the original, documents. And then that’s really it.

So, that’s also, very linear straight workflow, and it’s just about converting whatever you have in a format which is suitable for vector databases. Now remember that you might decide not to use vector databases or to use vector databases and, systems like Elastic search or even Google search, you could also, use it, but you have to pay for it, obviously, commercial offering. So, you could also, use it instead of vector databases, but vector databases are extremely popular in the RAG world.

Now, this is just about this chapter. It’s a new chapter. It’s just about how to use Retrieval Augmented Generation in your enterprise. So, at the first use is just about talking to your documents. So, you have a lot of documentation and, like for example, you have the documentation, JIRA or whatever in Confluence. And then you want to, ask questions in natural language and let the system search your database of documents for you and give you a nicely summarised, answer. And you can also, use the NLP capabilities of the Large Language Model to perform extra operations on the text. So, instead of just looking up a document and then making the cognitive effort to look the whole thing, you actually just go to, kind of a chat bot interface and ask questions about, for example, if I’m interested in 10s, can you please give me information about all the 10 products that, or the most, common 10 products which our company is selling? For example, you could have a question like that. So, you, and then it gives you, it searches your, internal database, and then it spits out a nicely formatted, answer. And you can also, use these extended capabilities of the Large Language Model, like summarisation, for example, or you could translate the answer to a different language on the fly. So, this is one very nice, thing about this type of RAG systems.

And then you can use it for search augmentation. You can build businesses on top of this idea. So, if you have a good search engine, a lot of knowledge that you actually commercialise, and you want to, have a different search experience, instead of letting people search for keywords, you ask, allow people to, you know, ask, questions in natural language. And, then you basically, term the search experience into a chat bot type of experience. You can use a RAG systems exactly for this. There are a couple of business examples businesses built on top of this. One is Perplexity.ai, another one is actually also, even Google. Google started doing this. Now, if you search on Google these days, then it’ll give you a nicely packed answer at the top, with the Gemini, logo next to it. And so, it gives you a summary. And this summary is actually quite nice to read because it extracts the most relevant parts, and it is well written, and you can very often use it immediately if you need to, you know, grab the information. So, you don’t need to go through the search results and do all this cognitive effort of understanding what’s relevant for you, what’s not relevant in this search results. And, and then writing something about what you found. So, it actually search augmentation is actually a productivity, a big productivity enhancer, that you can achieve with RAG.

Then another, very typical problem of enterprise is customer self-service, which is customer support, to be honest. For example, companies like Curries, for example, you know, if you want to get customer support, you very often you need to go through a documentation portal or ask someone. Now, you could, make it easier using RAG system. You can just get all the knowledge together, then index it, create, a retrieval augmented system, put some chat interface on top of it. Normally chat interfaces are used for RAG systems and let people just ask questions to the system and see what they get. And they will probably get quite good answers and alleviate the load on customer support agents.

Then there is also, for retail product search. So, you can use RAG systems, which are connected to a retail database, and you can allow customers to search by asking questions. And, you know, using a chat interface, you can, for example, ask questions like, I want to buy a new tent. What would you recommend? You can ask this type of question. The RAG system can give you proper answers to these types of questions. You can look up in the product database first, and then find information about tents, and then give you some quite good results about tents. Now, the nice thing about, this type of use case is that you can use the LLM capabilities to enhance, the results of the search. So, for example, what you could do, you could tweak the prompt to also, search for related items to the tent instead of just giving information just about the tent. And there’s a tent, here, this is a very good price, and the price is this and that, and you can find it on this store, and blah, blah, blah, blah, blah. These are the conditions related to the tent. You could also, have more information like saying, if you need a tent, perhaps you also, need mosquito repellent and some other stuff. So, you could basically turn the response into a much more useful, response that looks at the relationships between tents and other, items that you commercialise. So, giving you a much better product experience that will actually increase your sales as a retail business.

Now, HR and talent management is also, a part of your business, which is known to all enterprises, right? Which can benefit massively from RAG systems, in my opinion, because you can just interact with your knowledge using natural language. First, it makes things easier, and then it can look up documents related to talent. For example, if, one HR recruiter is actually looking for someone with accounting skills, you can just ask, can you please give me, some, show me some candidates that have accounting skills in this, in this area, and have these skills, blah, blah, blah, blah. And then the, the system will search for some documents. It might miss some, obviously, but, then it can give you a summarised answer. So, the cognitive load on the agent is actually lessened because the HR recruiter will, won’t need to sift, read through all the documents one by one, and then try to figure out things. But the system will take a lot of load out of you, actually. And then the good thing about this type of system is also, it’ll give you references to the actual documents. So, you will get a summarised answer, but you’ll get also, the relevant documents. So, you also, have a reference, and you can actually crosscheck if the model was hallucinated somewhere.

And then another very interesting one is personalised marketing. This is, marketing that is targeting, your profile. And how do you do that? with a RAG system, you have two, like two search databases. In such a RAG system, you have one which is about the product, customer is looking for. And then you have another search database, which is the database with the customer profile. And so, in such a RAG system, you would search for the product, grab information about the customer profile, combine them together in the context, and then, tweak the prompt. So, that the prompt takes into account in its response, the profile of the customer, allowing the customer to be addressed in a much more personalised way.

So, RAG systems, are not just the simple thing, which I explained, but they are also, extremely flexible, and you can actually enhance your business. And I’m pretty sure you can enhance your, cashflow, I think really in some areas directly with, with RAG systems, actually. So, it’s really worth to think about it if you have a use case for them. There are many more other use cases. So, but these are a couple of them.

So, I’ll just, skip all these slides, because this is just what I just said. You can have the presentation like Garima said, you can have it, on our page then.

Now, what I described initially was a very simple form of Retrieval Augmented Generation system. Just the basic, the core basic. What I’m going to show you now is how you can actually enhance these systems and turn them into really enterprise grade solutions. So, if you want just to create a prototype, what I showed before is fine. That’s what most people do in the beginning, really, when they start playing around, just grab a vector database and so on, and grab a Large Language Model, grab an embedding model, and you have all the things, create a simple workflow. And it is amazingly actually quite amazing what results you can already get with that. But that’s not an enterprise grade RAG.

Now I’m just going to show you how you can get to, to this enterprise grade RAG by just incrementally increasing the complexity of the system. So, I described the basic right before just the user, fires a query, a data store, retrieve some search results. They are combined, sent to the Large Language Model. The Large Language Model generates a nice response. Because it has more information, it can cite sources. it is better grounded. So, this is just the basic thing.

Now, the first thing that you can enhance is if the user query, is kind of vague or very, has little information, you can expand information of the user query. You can, enhance the query. So, that’s the, the main idea. And you can enhance it in multiple ways. You can, check the language. You can, decompose the query, meaning, for example, if you ask about the weather, you can, generate other questions like, which will be the temperature, which will be the humidity, will it drink tomorrow? So, instead of having just one question, you need to get decomposed in multiple questions. You can classify the intent to prevent from the misusing the system, like people are asking, questions which are not related to the topic of the system. You can also, use history to create this kind of personalised, more personalised use information. And you can also, use other techniques like this Interleaved Retrieval Guided by Chain of Thought Retrieval in which you actually create, a reasoning plan for the Large Language Model in advance. So, this is quite advanced technique.

But let’s continue. So, this is just how you can enhance queries. There’s lots of details about that. But now what you can also, do is instead of just having a vector database, like what I mentioned, you can have also, hybrid search, like systems like Elastic search or Google search, or then there are many other types of search engines these days. So, you can combine both, and you can combine the results. So, you search in the vector database, and you search with a hybrid search. And, then you just combine the results using reciprocal rank fusion, for example, which is, just, a way to merge 2 ranking results. It’s actually quite simple algorithm, but we are not going into this kind of stuff here. That’s it. So, you can enhance the data store.

Now you can enhance, the, so, the ranking of the results too, so, you can use specialised models to kind of re-rank the results. So, this is also, quite effective, specific, it pushes to the top that those results from the search engine, which are the most relevant. So, this is an adjustment, let’s say. So, and there are, Large Language Models like this one here, which, I used is jina-reranker-v2. It just re-ranking basically has the question there and then the documents. And that’s just, changes the, the sorting really. Then what you can also, do, you can, at the end of this whole process, you can validate. So, you can have a Large Language Model, which is validating the response, see if the response actually is or not, and then it stores some kind of, rating of the end response, somewhere in the database So, that you can build some kind of statistics. So, like you also, will need something like Google Analytics or analytics on your system. And this is a way to get those analytics, the analytic part into the direct system.

Now, you can also, enhance, the indexing part of the system. And this is here? Let’s see. So, we saw before that, you, have, in the indexing part just three basic steps. You read the file, change the files, clean the data, then you, create embeddings. So, you kind of convert them into these chunks into the format of your search engine in a sense, and then you save them into your search system. So, this is the simple, idea about, this workflow. Now, you can enhance these steps. When you chunk the files, there are multiple ways of chunking the files. You can use semantic chunking, for example, which is a very interesting technique. You chunk every, initially, text in sentences, and then you see where the meaning of the sentences drastically changes from one sentence to another, and you chop off, the sentences at that point. So, semantic chunking is like bit of state-of-the-art kind of solution in this area, but there is also, hierarchical chunk where you create bigger chunks and then you reduce them to smaller sizes based on their semantic meaning also. So, this is like with state-of-the-art kind of technique that you can use.

Then, you should extract metadata, like page numbers, section language of the chunks, before you index them. And then actually if you are, going to use, other systems besides, vector databases, you could also, create a knowledge graph. And we’ll talk about this, in a moment. And finally, you have to start the knowledge graph.

This is just to mention, this is a new chapter. So, basically what we saw here is how you can enhance your Retrieval Augmented Generation system in specific ways. So, that you get an enterprise grade system. So, this was the topic of the previous chapter. Now, there is another variation of the RAG system in which you, introduce an agent into the system. And this is also, a way to have RAG plus plus sort of, created.

So, remember, this is just the workflow we had before. The simple regular flow user sends a request, there’s a conversion to a specific format, then you search on your search engine, then you combine the research results with a query. And then instead of interacting with the Large Language Model, interact with an agent. An agent is a Large Language Model plus tools. And these tools can be search engine, external search engine, real-time search engine, and or code interpreter where code can be executed. And suddenly, your Large Language Model has extra tools, so, extra capabilities because it’s an agent. And then it can do actually more, it can provide you with more insights. So, it, you could theoretically, the large language can generate code, execute to code and give you the results in the response. For example, this is just an example. We’ll talk about agents in the next, webinar. So, stay tuned. We’ll talk also, about, this type of, agent, which is typically introduced here.

So, obviously, it’s very important to evaluate RAG Retrieval Augmented Generation system. They need to be evaluated. And, so, what you evaluate in these systems, you have to evaluate typically two things only. You have to evaluate the retrieval and the response generator. So, why is evaluation so, important? Because specifically if you’re in an enterprise grade scenario where you have credit direct system and you introduce some change, or you change the Large Language Model, for example, and then, if you don’t have a evaluation mechanism in place, it might be that suddenly there’s a big degradation of your system. And, the customer complaints, they don’t come immediately, but your customers start suffering from a bad kind of deployment and you don’t notice anything. And, if you don’t have evaluation systems in place for your, systems that interact with the customers, then you are very, how do you say, in a bad position, if the quality suddenly degrades because this has reputational consequences, it might have also, consequences on your sales. Suddenly your sales start to go down and no one knows why. It is probably because your, system that interacts with the customer is actually not performing very well, and you didn’t notice it, and each has got a notice, and after one or two months, then suddenly you start to understand which system is actually failing. And it was your Retrieval Augmented Generation system. And because you didn’t have any evaluation in place, you actually screwed up your reputation for a while, right? And then you, it’s, it’s always when you screw your reputation, then you need to regain it again. And that’s not a very good thing. And anyway, so, it’s important to have evaluation metrics in place, and you need evaluate two things. One is the retrieval, another, the response generate.

What is the retriever again? The retriever is actually, the search engine. You have to evaluate your search engine. In this case I put your vector database, but like I said, it might be something different. And you have to evaluate if the results of your, search engine are really ok or not. So, that’s the first thing you need to check. And the other thing you need to see if the end results, so, whatever comes the final output of your Retrieval Augmented Generation system is actually satisfying your customers and making them smile.

So, when you evaluate the retriever, that is your, search engine. You have two types of evaluation. One is the machine learning based evaluation, which, uses, a data set with expected, responses and, contains also, whatever, are the results of your search. And then typically what you do, you use some machine learning methods like hit rate or multiple reciprocal ranking MRR, in this case, Precision, Recall, to basically give you some, estimation on how you’re doing. So, obviously this is a completely machine learning, it’s obviously an automated type of evaluation that you have here. And, for example, you use this metrics like hit, hit rate is really just to see, you know, in your results if you have, you know, have the right answer in there or not. So, that’s, it’s a very, very simple metric. The MRR is, metric, which already, takes into account the ranking. And Precision Recall, our standard, ML metric, like F1. So, in this case, you actually require a ground truth. It means you have to have, a set of, questions and a set of, expected results, and then you compare the expected results to what you ever you get during your tests. Now, there is also, an LLM based evaluation, which doesn’t require you to have an evaluation set. So, a data set, really. And, this evaluation is just about asking with specific prompts, the large English model to give you, some measure of relevance. So, you have a question, you have an answer, and you just ask the Large Language Model to give a rating to say, if it is very relevant, give me a 2. If it is, relevant, give me a 1. If not relevant, give me a 0. So, basically you just ask the Large Language Model to be the judge, let’s say, of the relevance of the results. So, this is just going through it.

This is also, a slide about how you actually would do it. There is a prompt here, for the LLM evaluation, first score each document on a scale of 0 to 2 with the following. Meaning 0 is this, 1 is this, 2 is this. And then large English model just replies, based on the question and the answer, and the answers that, and the documents that were retrieved from this search.

Then you also, need to evaluate the end result of the model. And for this, you can use classic, NLP machine learning based metrics, where you actually compare an expected results to whatever the model produces. And, for this use, things like similarity ratio, Levenshtein ratio and so on. These types of metrics, they just see a check how similar the text of the expected answer and retrieved answer are. And they give you some metrics that are a bit hard to evaluate. They give you numerical evaluations, and then you can also, use the Large Language Model as a judge to evaluate the end response of your RAG and then you can perform really amazing types of evaluation. You can evaluate according to specific criteria like correctness, relevancy, and factfullness.

In the interest of time.  I will just broth a little bit quickly through this. There is also, a very important type of evaluation, which is you should have a team of people actually looking regularly at, evaluating the, the results. You should actually build, elements into the user interfaces of Retrieval Augmented Generation systems, which allow human beings to evaluate a result. If you look at the ChatGPT interface, you have these, thumbs up and thumbs down, which are exactly, meant for that. So, it is very important that you also, have this type of evaluation. It’s extremely important. I would say this is perhaps one of the most important, types of evaluation that you can have. So, the user interface of your RAG system should have a means to allow users to do this.

And finally, and NLP know this is just an example of NLP metrics. Which are a bit hard to interpret if you don’t really know what they mean, and then they’re not semantically oriented also.

And this is just, a prompt which you can use, exactly for, response evaluation based on, a Large Language Model. So, I won’t go too much into these details.

Now, we talked, previously that you can have multiple search engines in a RAG system. And I mentioned I think kind of three, what actually, the GraphRAG is not really a search engine as such, but it’s a knowledge base. It’s like a representation of the knowledge base, which captures relationships. And this is kind of, something that enhances your searches, when you perform them. And Microsoft built GraphRAG, this year.

So, it’s very recent, and it addresses a couple of limitations with RAG systems access, seem to be like, oh, they’re really so, cool they can perform search and do this and that, and another thing. No, but they have limitations. One of the limitations comes from the way vector databases actually work. Vector databases are really good at finding local results. What do I mean by this? A local result is, for example, you ask about tents, this example that I had, and it then gives you, you know, finds in the knowledge base, it finds a lot of stuff about tents. But imagine that you are not looking for tents, which is a specialised topic, but you are looking about, a very generic topic like, or multiple, your question actually is a very broad question. Like, what is, what are the effects of traveling, for the human psyche, which are also, not, harmful to the environment and have, ethical considerations? This is a crazy question I know, but the thing is, if you start with a normal RAG and you ask these type of questions, which are very broad, or for example, questions like what are the main topics in this book? The RAG system will struggle with these ones because the vector database will look for the word topic for the meaning of topic. Then we’ll look at the concept of topic, and we’ll probably find some documents related to the idea of topic, but it, it cannot summarise the different, semantic fields hopefully. And it struggled with this kind of thing. So, normal RAGs are not good for global questions or questions, which, touch upon very high, multiple, very high-level topics.  they’re not good. They’re also, not good for top to bottom answers. So, making a relationship between, a very, abstract concept into a very, localised concept, a very concrete, concept. So, they are also, not good for that one.

So, they are flaws in this area, and like I said, they are typically good for specific answers.  I want, I’m looking, I have this problem, and I want, I’m interested in tents. Give me some tents. That it is good for this type of thing. But not for very, very broad questions or questions which touch, multiple concepts like camping, holidays, travel, wellbeing in one go.

So, I did some tests on this, with, GraphRAG and it’s really, really interesting what you get there. In GraphRAG, you have two types of searches. One is a global search, which is target, exactly this type of search, which is actually slower and targets, global conceptualised searches. When you are talking about concepts in your question, then you should go for this search. And then it has also, the concept of local search. When you are actually know your topic very well, and you’re interested in this, you want to know a bit more about this, also, get the context around it, then local search is the way to go. So, it’s, actually very interesting kind of domain. So, what Microsoft, what, sorry, what GraphRAG does in the background, it actually creates, graphs of knowledge. And these graphs, they look like this. It creates communities which are, community summaries, which are the summaries of clusters of knowledge in your, database. It all obviously creates also, the underlying, knowledge graph. It creates a graph in which the notes are topics, and the relationships are just, conceptual relationships.  It produces you can actually depict the actual graph behind, these RAG systems. You can actually depict them really in a graphical way, which is really, really nice because then you can see your problem domain, which is typically just text initially in a graphical form. And so, what I did, I actually took the D-Well, knowledge base, and I transformed it into the graph, and then I tried to visualise it using the Neo4J tools. So, that’s basically what I did here. And what you see these queries are Neo4J queries, which I just used to visualise our knowledge. So, I think in blue, if I’m not wrong, these are communities, and then the red ones are just entities, and you see the relationships between them. So, it’s quite interesting.

Like I said, there is global search. This is the, the workflow for a local search. The user asks a question, then, the knowledge graph is queried, and the context is built, and then this context is actually chopped in multiple batches. Then there is a loop, which, will, use the batches and query the Large Language Model to receive just a list of key points of reports.  So, at this stage, we’re not answering anything, so, we’re just basically grabbing a load of information about all this, which is, comes from the knowledge graph based on the user question. Then, we, interact with the live language model multiple times just to get what are the key points, what is the most important ideas here? And so, there’s a very complicated prompt, but it gives you the most, relevant points about this kind of global question. And then these, key points that are sorted, according to the relevance, and then the key points and the initial question are then used to generate the response based on these, filtered reports. So, this, at here, where you see generate, response based on filter response is actually when the actual response is synthesised and sent after that to the client. So, as you can see here, you have multiple interactions with the Large Language Model. And, so, this is actually quite slow, but the responses are really, really good.

Specifically, you start asking things about what are the main ideas behind, the concept of camping and, kind of, effects on wellbeing, and So, blah, blah, blah. So, then you, you get better answers now if you just want to know about tents, then you use a local search. And it also, enhances the search with information, about the knowledge graph. It only interacts once with the Large Language Model. So, obviously in order to have a graph, associated to your, Retrieval Augmented Generation system, you need to generate the graph. I’ll talk about this a little bit later. I just wanted to say that GraphRAG has a prompt generator. So, the whole RAG system has, a way of tuning itself, which is quiet, nice asset to have it just an optional asset. And you can also, de not decompose, extend your questions. So, if you have a question, if you’re in local mode, you can, generate from your case and generate other questions. So, it comes with some extra tools, the whole system. So, it is quite nice.

This is just the GraphRAG indexing workflow, which, reads file chunks the files, and then it extracts the graph, meaning it extracts the entities, which, and this is all done with the help of the Large Language Model, which I didn’t put here in, its missing. But the graph is generated by interactions with the Large Language Model, and then, the relationships are established between the entities, and then it uses a specific algorithm to extract, clusters of information, and then it summarises what is in those clusters. And this is done also, in a hierarchical way, So, it has, can extract bigger clusters, and then inside of the clusters looks for sub clusters and so, on. And then it gives you, something called the community summaries. And these community summaries then are also, extended with some more information, which is called the claims. So, it creates a very, comprehensive graph. And this graph is then stored, in as, actually as tables in typically in the file system or it, also, uses a vector cache, so, it caches a lot of information also, in a vector database, basically.

And now to our last topic, my hope I’m still doing with time. So, how can you go beyond RAG because RAG is an external system to the Large Language Model. It adds complexity. Like you saw, if you want to create, a state-of-the-art system, then you have to really create a very complicated system yourself. But if the Large Language Model could do everything that we want just for us, and just have one single interaction with it, and it does everything that this RAG system is actually doing, so, and there is a lot of effort in the industry towards this goal, I find this goal is not accomplished yet. So, RAG systems are still kind of useful.

But before we go there, we have an audience poll. In which areas would your company profit from information retrieval? So, here, there are a couple of areas, customer support, human resource, and talent management. What do you think after hearing all of this, how could you use RAGs and, get some business value out of it? So, we want you to actually think about what is my business and how could I use these concepts, which this guy is talking about, but that’s it. Let’s continue with this. So, have a go at this poll I’m very interested about results. So, how could you profit from it?

The main idea about the RAG, RAG is efficient to extend the knowledge of a language model, but the knowledge is kept outside. That’s one of the problems, right? And the main idea behind what I’m talking about now is how to bring the external knowledge into the Large Language Model so, that the system gets, is actually simplified. So, there are three main strategies to bring the RAG system in into the Large Language Model. One is model fine tuning, which I’ll explain long context models. Google’s very good at these ones and memory transformers. So, these are the three techniques that I found around to go to a world, which is post RAG world, in which the Large Language Model does everything for you.

So, model fine tuning is works, and it’s about, training the upper layers of the Large Language Models with specialised data. Obviously, you will not choose sometimes because if your data is really confidential, you won’t choose the bigger, providers, and you would like to do it in-house or something like that. but, this technique, is actually successful. It’s integrating external knowledge, into the fine-tune model. Now, the problem with fine tuning are it requires a lot of resources, typically, in terms of compute power, but also, in terms of time also, because it’s resource intensive definitely requires a good amount of GPUs and also, people who can actually perform these tasks and need specialised people who are really good at this kind of, operations. And, on every update of your knowledge, you need to fine tune again. So, you need to keep on fine-tuning, fine-tuning fine. And this is kind of a slow to update, and it’s also, really expensive.

Now, long memory transformers is a brilliant idea. It’s, about having a huge context window in your Large Language Models, which can absorb lots of, books, videos and so on. It’s like a giant belly of the Large Language Model. And some models have these capabilities like Gemini Pro 1.5 and, with 2 million these days, and they can process in one go lots of information. Now why are they not very suitable? They’re expensive to use because you have to send a lot of information every time you ask a question or have an interaction. Then it is also, potentially slow because there is a lot of, information that you need to push over the network to these models, and, it might have also, a lot of redundancy on specific questions. If you’re asking about tents, you are probably not interested about, all the information about, flights and so on. Sometimes you’re not interested about this or other information which might go into this huge context window. So, it’s some kind of a wasteful kind of principle that kind of like the capability, but I don’t like to use it sort of thing. And then there are also, risks of confusion on answering. If you ask a very localised question and you get a huge body of knowledge, the model might be thinking, perhaps I should talk about something else here.

And finally, I found another idea, which is a research idea. I tried out this model, extended mind transformer. The results were a little bit mixed, but I also, didn’t have access to the largest models. But still this is about, at runtime after the model has been trained to inject memories into the model memories that just, convert text into the internal representation of the model and, injected. And then at the inference time, this models this, memories, sorry, are queried and they are injected into the different layers of the model. And it works. But it’s fairly new and untested, and you will need to run the model and be able to inject these memories, when you actually have, your system running. So, but the advantage of this is that you really don’t need to train the model. You just update your knowledge base, inject it, and you’re basically done, and you start it again. And then you can, have access to this external knowledge. So, this is something that is also, related to Retrieval Augmented Generation, but it’s still, I think it’s more still research. I don’t think it’s, ready for enterprise use, but it might be in the future, like in one year or so. Let’s see how this actually develops.

So, this is just explaining. So, these are my attempts. I injected some knowledge about Onepoint and then asked about Onepoint. It knew about Onepoint. I also, asked general, more localised questions. When was Onepoint found? It was in 2005, and it’s actually in a very weird way, it actually replied the correct thing, but it was a bit hilarious. Anyway, but that’s about it.

Now. I would like to have the audience insights. Thank you. So, it seems that review and feedback analysis is the, the most used for, use case and, customer support. So, that’s really, so, RAG systems are very popular in this area, but, so, thank you very much. I think we’re done. Sorry for running late. These are my credits to all of these sit on screen and now for Q&A.

Garima Dosi (Moderator):

So, that was a lot of knowledge, Gil on RAGs and beyond. In the interest of time, I would just take up a simple question, which says, given the rapid enhancements, how can we ensure that our RAG and GraphRAG systems remain future proof and adaptable to the evolving landscape of Large Language Models? So, given the enhancements.

Gil Fernandes (Speaker):

I think, future proof is perhaps not the most important thing. Imagine that you have a simple RAG system, and it actually gives you extremely good business results, and you can measure the success of the system. If this system is enough, it’s actually fine to keep the system. It’s a little bit like in football; you actually never change a running team. There is a saying like that, right. So, actually you have actually to build really good metric system around it. And then that’s the, actually the most important thing. So, you have to have evaluation system around whatever RAG system you have. And then if a new type of, RAG comes out, like a very good model that makes things cheaper and so on, then you need to also, use the same evaluation system that you created for your initial RAG and apply it, apply it, and then evaluating, compare the two systems. And then if you find that the new technology really outperforms the old technology on your evaluation system, then you should adopt it. But you should not just adopt stuff that is just new because it’s new and because people are raving and hyping about it. The most important thing here, build your own evaluation system. That’s the really important, really important thing. And then adopt the new, if the new outperforms the old on your evaluation system. I think that’s the main thing.

Garima Dosi (Moderator):

Great. Gil, thank you for the session today. And thank you, to the audience for listening. We are sorry for some of your question were not, were unanswered. You can always, send queries or feedback to Gil. He’s available attechtalk@onepointltd.comand also, onLinkedIn, which is, displayed on the screen. You can also, read Gil’s blogs, onmedium.com.

[techtalk@onepointltd.com](mailto:techtalk@onepointltd.com)

LinkedIn[8]

medium.com[9]

So, in the coming webinars. So, in the Roots to Fruits series altogether, it’s time to now grow from branches to leaves. And so, the next topic would be a fresh new leaf and a very important one too, which would be related to agents, AI agents. And the webinar for agents, will be hosted in the coming year that is 2025. So, until then, while we wait, for those webinars to come up, the green and fresh needs to emerge.

You can still access the session recordings of the previous webinars that you might have missed, or you may want to revise. So, you can still access those recordings on our website,onepointltd.com/techtalk. The link will also, be sent to you post webinar. So, I think now let’s close this session. Thank you everyone, and bye for now.

onepointltd.com/techtalk[10]

### Upcoming webinar

From fundamental concepts to cutting-edge developments, this session will equip you with the knowledge to make informed decisions about implementing AI agents in your organisation.

[Register now](/techtalk/ai-agents-demystified/)

### Webinar replays

AI is transforming the way enterprises operate. This session offers a glimpse into how Onepoint applies AI for business use cases to create value for our clients and ourselves.

[Watch now](/techtalk/making-ai-work-for-you-how-onepoint-does-it/)

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

Gigaspaces[11]

[Watch now](/techtalk/unlocking-the-power-of-real-time-data)

### Coming soon

For more webinar replays, visitOnepoint TechTalk

[Onepoint TechTalk](/techtalk#replay)

- What we doArchitect for outcomesDo data betterInnovate with AI & moreSpringboard™ WorkshopOnepoint Labs

Architect for outcomes

[Architect for outcomes](/architect-for-outcomes/)

Do data better

[Do data better](/do-data-better)

Innovate with AI & more

[Innovate with AI & more](/innovate-with-ai-more/)

Springboard™ Workshop

[Springboard™ Workshop](/onepoint-springboard/)

Onepoint Labs

[Onepoint Labs](/onepoint-labs/)

- ResourcesOnepoint Data Wellness™ SuiteOnepoint Res-AI™Onepoint TechTalkOnepoint Oneness

Onepoint Data Wellness™ Suite

[Onepoint Data Wellness™ Suite](/data-wellness/)

Onepoint Res-AI™

[Onepoint Res-AI™](/onepoint-res-ai/)

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

[cky_video_placeholder_title]

[cky_video_placeholder_title]

[cky_video_placeholder_title]

[cky_video_placeholder_title]


## Sources

[1] Architect for outcomes: https://www.onepointltd.com/architect-for-outcomes/
[2] Do data better: https://www.onepointltd.com/do-data-better
[3] Innovate with AI & more: https://www.onepointltd.com/innovate-with-ai-more
[4] Home: https://www.onepointltd.com
[5] Onepoint Techtalk: https://www.onepointltd.com/techtalk/
[6] onepointltd.com: https://onepointconsulting-my.sharepoint.com/personal/blessy_athisayamani_onepointltd_uk/Documents/onepointltd.com
[7] Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks: https://arxiv.org/abs/2005.11401
[8] LinkedIn: http://www.linkedin.com/in/gil-palma-fernandes
[9] medium.com: https://medium.com/@gil.fernandes
[10] onepointltd.com/techtalk: http://www.onepointltd.com/techtalk
[11] Gigaspaces: https://www.gigaspaces.com/

## Metadata

- URL: https://www.onepointltd.com/techtalk/the-future-of-enterprise-data-access/
- Last Scraped: 2025-08-09 14:12:33
- Content Type: Web Page
