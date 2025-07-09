# Spotlight on Dark Data with AI - Replay — Webinar — Onepoint TechTalk | Onepoint - Do data better | Innovate with AI & more | Architect for Outcomes

Source: https://www.onepointltd.com/techtalk/spotlight-on-dark-data-with-ai-replay/

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

## How to turn the spotlight on Dark Data with Gen AI

In today’s digital age, organisations constantly generate vast amounts of data through internet activity, digitisation, and automation. But some of this data is unused for driving improvements, innovations, and new ideas. From application logs and email communications to customer call records and IoT data, both small and large organisations could be sitting on hidden value buried within this Dark Data.

This event was livestreamed and recorded

- Explore real-world examples, such as using data for personalised recommendations and analysing server logs for predictive maintenance.
- Stay ahead in the data-driven world and learn how to utilise untapped resources and unlock the hidden value.

- Understanding Dark Data: What it is and why it matters.
- Strategies to uncover and leverage dark data.
- Real-world case studies and success stories.
- Tools and technologies for managing unstructured data.

- Data leaders, scientists, analysts, and managers and scientists.
- IT professionals and data managers.
- Business leaders and decision-makers.

This webinar is a value add to our previous Unleashing the power of Large Language Models, Part 1 — Direct interactions​ session. While not mandatory, familiarity with direct interaction concepts will be useful. You can watch a replay of Decoding AI: Session 2 webinarhere.

[here](/techtalk/unleashing-the-power-of-large-language-models-direct-interactions/)

[cky_video_placeholder_title]

Garima Dosi (Moderator):

A very warm welcome to Onepoint Techtalk yet another webinar in the series, Roots to Fruits.  But this time we’ll jump directly into one of the fruits that can be reaped by using Gen AI or LLMs. As also highlighted in these slides, right at the top there, the value coming out of the LLMs, or you can say the applications of LLMs.  So, today’s fruit is all about lighting up the Dark Data and how LLMs are useful in it.  In the last webinar by Gil Fernandez, he had explained about unused or undiscovered data in organisations like server logs, emails, IoT sensor data, and a lot more.  With the advent of LLMs, it becomes easier to tap the potential of such data sets and also put it to good use and beneficial activities for organisations.

So, in this webinar myself, Garima Dosi I am your host, and Allan is going to join us and throw some light and AI insights on Dark Data with the topic ‘How to turn the spotlight on Dark Data with Gen AI’. So, Allan Schweitz is the Director of Technology – Services at Onepoint. And in his 25+ years of experience working in data and IT projects, he has architected and delivered high-performance solutions for major organisations. And in his recent roles, he played the Lead Architect for Azure and Talend-based intelligent data platforms, and he was also an instructor for Cloudera Big Data Technologies. His current interests include blockchain, Kubernetes, and of course AI and Gen AI. Anything related to data science or cloud-based solutions. So, it’s a pleasure to have you here, Allan.

And before we start, just some common guidelines again, the first one being that the PPT resources and a recording of this session will be made available to you after the webinar. And the second one is there’ll be a Q&A session at the end, so you can keep posting your questions using the Q&A option, and we will take them up in the session.  So over to Allan.

Allan Schweitz (Speaker):

Thank you, Garima. Hi everyone. It’s a real pleasure to be here and to talk to you about something that I’m really passionate about and something that’s close to my heart. I have a long history of working with data and especially with the recent hype of AI obviously, there are lots of more interesting things happening in the world of technology. And so today going to cover a very specific topic that was brought up by, Gil Fernandez in previous sessions, which is Dark Data. So, let’s just dive into it immediately I’ll share the screen.

We will be covering the Dark Data and begin with a little bit of what Dark Data is, what the importance of the Dark Data, why does it matter to you, and how can we manage Dark Data, what can we do with it.  And then at the end, a little bit of hopefully some crystal ball watching in what the future may bring. And lastly, there will be some time for Q&A.

Alright, so embrace the dark side. This session is all about Dark Data and the potential that lies within it and how we can unlock it. So hopefully, I will be able to unravel some of the mysteries about Dark Data.

Just some statistics, in the last 3 – 4 years, 90% of all the world’s data has been generated, and it’s been growing exponentially. Every year we generate more and more data. I’m not sure if you remember the hype that was big data about a decade ago. I wouldn’t even call it that big data anymore. It’s become gigantic data. gigabytes turned into petabytes, petabytes turning into exabytes, and it’s growing even faster. So, a large amount, even the largest amount I would even say of this data that is being generated daily we can consider to be Dark Data. If you look at Gartner’s definition of what Dark Data is, it’s information assets that organisations collect, process or store during regular business activities, but generally fail to be used for other purposes. So, they collect the data, they do whatever they need to do with it, and then it’s put away and pretty much forgotten about it.

If you look at the amount of data that we collect, you could say about 15% of that data is actually critical data or is BAU data.  So, data that’s being used on a day-to-day basis, business as usual. Then you could say like 30% of that data is redundant, obsolete, or trivial, meaning people just, duplicate data, or it’s data that doesn’t have any extra value, or it is just trivial data. And then you have obsolete data. However, with obsolete data, I think we need to be a little bit careful because we may think that data is obsolete right now, but in the future, we might find that data actually to be useful. So sometimes obsolete data may be obsolete at this moment in time, but if as things change, they might be useful in the future. And in the context of AI, think about training data. Lots of data that we thought was kind of, doesn’t make any sense or useful. Lots of that data like conversations, blog posts, forum posts, Reddit data that’s been going on like 10 years ago. Nobody is interested in those discussions of 10, 15 years ago. But now the big AI companies are actually interested in the data. So that data that was considered obsolete is suddenly becoming interesting data. So, a little bit careful with that one. And then 50% of that data we could consider Dark Data, meaning it just goes someplace, sits there and pretty much is forgotten about it.

Dark Data, I’ve kind of categorised different types of Dark Data. The digital dust bunnies, like, you know, the dust bunnies that accumulate in your house in the corner where they’re hard to get.  And people forget to clean or vacuum.  And so, they built up over time.  Those are the digital dust bunnies where like server logs. your emails. You know, if you have standard email rules, they get categorised automatically into, sub-folders. That’s how I work with my emails.  I have some rules on them, and they automatically categorise them and puts them in subfolders. And I tend to forget about them because, in the first instance, I don’t consider them important. But later on, actually, I might go back and then look at them and see if I can find some useful information in there. Customer call records, all those types of things. You can, like those little daily data generations that happen every single day. You could consider those the digital dust bunnies.

Zombie data, data that’s outdated, like old versions of reports like the, on that files in a sense, I think we can all relate, well, I hope we can all relate that. You have some data sitting there on your shared drive, and we think like, hmm, shall I delete it?  Shall I not delete it?  Well, let’s not delete it on the safe side. And it’s too much data to go through and organise all of that data, and you just leave it there. And any new data where you’re not sure what to do with it, you’ll dump in that folder and that folder only grows. And because it’s also big, you are hesitant to kind of organise it and it kind of sits there. So, that’s what I called zombie data.

And then lastly, the Bermuda Triangle. So, this is where data goes and disappears. It’s like the abandoned projects, for instance, something or where merger happens, then things get moved around and something gets moved to another place, and suddenly, no, one knows where that data is, so it like disappears. It’s probably still sitting out there in somewhere on some server or maybe even somebody’s local computer, but nobody knows where it’s gone. So, that is like the Bermuda triangle for data. And so we have all this data sitting around, which ultimately are quite often turns into Dark Data.

Next, I would like to do a very quick poll. Having that in mind, like, the digital dust bunnies, zombie data, Bermuda triangle. What is the biggest challenge in your organisation at the moment for dealing with Dark Data? I would like to get a little bit of insight of what you guys are, are facing. So let me know let us know which ones is most applicable to your organisation, and maybe later on we can discuss and, the different options. In the meantime, whilst you are making your selection or go through it, I will continue.

Now that we know what Dark Data is, why does it matter? Why do you need to be concerned about Dark Data? Now, first of all, Dark Data often holds like an untapped potential that can drive things like insights. And with insights you get, you can uncover hidden patterns, you can find correlations between things. So, it gives you more value once you on how would you say you unearth these hidden patterns and correlations. It can drive innovation by helping you to identify new business opportunities and new business models. I’ll give some examples later on. There is some competitive advantage in that you can, even with data, you can even further personalise interactions. You can further improve customer satisfaction. And again, some of these things can come out, and I’ll give some examples later in one of our customer projects that we did where it could help. It can help with risk management, within Dark Data itself rise lies a little bit of a risk as well. But which I’ll come back to later as well. But here in this particular case, it can help you with risk mitigation, things like early fraud detections, detecting anomalies within your data. So, those type of things it can help with as well.

And lastly, Dark Data kind of is an indicator of the data governance and data management maturity within your organisations. So, another way of saying it is that the more your organisation accumulates that Dark Data, it symbolises an inefficiency or a misdirection of vital corporate resources within your organisation. So, it means, your organisation is not working in a optimal way because the better you are suited. So, the more efficient your company or the higher, the maturity of your organisation, the more efficient it becomes. And ultimately, the less Dark Data you accumulate. I’m not sure if everybody is familiar with maturity models, but within different areas, you can define a level of organisation maturity in that specific area. Typically, you have five areas. the lowest level is pretty much chaos, and the highest is perfect efficiency in a sense. And I find that our clients typically are at the low spectrum, lower levels of that maturity. And Dark Data is a very good indicator. The more, the higher your maturity, the lower or the fewer amount of Dark Data you’re collecting.

So how is this coming about with Dark Data typically, or with data in general, out of sight, out of mind, meaning, well, if I don’t see it, I forget about it until, until it’s sort of becomes a issue. It’s a bit like a ostrich kind of mentality, if you like. If we don’t see it, then we think it’s not an issue, but it can be an issue.

Let’s have a look at some of those potential risks that come with Dark Data. One is high costs, particularly around storage. If it’s just accumulates, it just grows and grows and grows. And that can be for different reasons. One of the reasons is because of people just forget about it and it just accumulates. Or it could also be that the organisation is not very efficient in processing that data, and that increases the cost of data. And so, the more efficiency come, then the cost will automatically be lowered. Then there are security risks. Think about, for instance, if that data contains privacy data. That needs to be properly managed according to, compliance.  So that brings a risks. Not only that, if that Dark Data sits there and it’s not properly secured and is accessible to people who are not authorised to access that data, that by itself comes becomes a risk. And it’s not just privacy data, but maybe it’s just general company data. It contains IP data, that data which you don’t want to expose to unauthorised people. So, that is a risk.

Compliance violations, think about like I just mentioned, privacy data. If you hold that privacy data then you need to, comply with certain rules and regulations in the way you manage, and store that data. Also, there is also retention policy. So, you need to either retain or discard the data. So, for financial institutions, probably there is like a seven-year depending on where you are, seven-year policy, where you need to maintain the data, but in other instances, you need to also discard the data as soon as you finish processing it. So those are different compliance violations. So, if you don’t discard the data and it just grows, then obviously you are in violation. And then it creates a data swamp, meaning like you just accumulate and accumulate, and it becomes a mishmash of lots of data where nobody knows what the data is for or where it is. Apologies if you’re not a Star Trek fan.  There will be several Star Trek references throughout this presentation. So, I hope you can still appreciate the analogy Dark Data with Star Trek. If you accumulate it just becomes a swamp.

Why does data turn to the dark side? Another Star Trek reference. First of all, it’s really lack of awareness and the concept of Dark Data is actually risen only in, popularity the last couple of years. And it’s because the amount of data we are producing and people are because of that, it’s just reason people are still unaware of Dark Data as a concept. And therefore, not really focus on it as such. And so as Dark Data tends to grow, people are really not, aware of it, and they don’t understand the value or relevance of it. Lack of governance, again, one of the things that define your maturity. If you have a low data governance maturity in your organisation, you will struggle to manage to track your data ecosystem efficiently.  And so, it can cause data to become disorganised, lost, unusable. And so, governance is lack of governance. Legacy systems where data is trapped often and can’t be accessed or exposed to other systems or integrations. We have changing business priorities whereas the business evolve, then certain data assets become less relevant. The data stuck in silos. This silo, this is a big one. If a company is organised in silos, then as such, the data used by these different typically get stuck within those silos.

Data fragmentation where some dataset gets fragmented and this or distributed across different places within your organisation. Data is unstructured. This is another one. Traditional data tools have a big difficulty in processing unstructured data. And so, because it’s unstructured and very difficult to process, it just tends to sit there. And within that unstructured data, lots of titbits of information that is very usable to the organisation becomes unaccessible quality issues. Again, if there are some minor quality issues with the data, people tend, oh, it’s not reliable data, and let’s just leave it there and not use it. Regulatory compliance, which I already mentioned where you need to, for instance, retain data for a long period of time, and that data just sits there and nobody does anything. And then lastly, the sheer volume of the data. With this explosion of data in the last years, companies have had difficulty coping and processing the sheer volume of data. And so, because it’s so much, it becomes overwhelming and too much for organisations, and, they just tend to leave it and not deal with it as such. And so that’s one of the issues that organisations really struggle with.

So, I hope by now you have been able to identify some of the challenges within your organisation. And looking at the results, I can see that just identifying and looking the data is kind of the biggest issue, followed by no idea. And I think no idea is kind of, highlights the fact that awareness is still a big issue within organisations that, because there is no awareness of Dark Data, and it just tends to, to be there. Okay. Well, thank you for participating. There’s another poll coming later on that was very, very insightful, but let’s continue. Don’t have a lot of time.

Dark Data, the Rise of Gen AI.  Because this is a series of AI, Gen AI, and so I’m going to focus on Gen AI, there are many ways, many tools to deal with Dark Data, but this particular one, I’m gonna focus more on Gen AI and how Gen AI can help deal with our data. Now, AI is not new, and we’ve been dealing with AI for a long time. But typically, people back then were more talking about machine learning. And so, Gen AI is a very particular form of that. but unless you’ve kind of been isolated or living under a rock you’ve, probably noticed that Gen AI is really the hype nowadays. Everything is AI, any major company is AI this, AI that, embedding AI, talking about AI. And so, I want to briefly focus on how AI can really help in the area of Dark Data.

You could consider Gen AI as the lightsaber companion of every Jedi master. With the rise of Gen AI and the capabilities of Gen AI, suddenly it unlocks a huge, even bigger potential of Dark Data than it already had. Just if you look at the capabilities of Gen AI, you don’t have to be an expert to understand the potential it has. So, some of these capabilities that Gen AI has that helps you, that can help you with unlocking Dark Data, is it understands natural language. Lots of the data is written in natural language.

Remember when I said unstructured data is a big problem that causes Dark Data because it can’t access the information that sits within that unstructured data. This is where AI shines. That unstructured data is often just written free text written, and Gen AI understands that perfectly and with that unstructured data, because it understands that natural language. And not only natural language, English, any language for that matter, or most major languages, it can create structure out of that unstructured data. So, you can tell it, here’s a document, it’s written in free text. summarise it for me or extract these bits and pieces out of that document for me. No problem. It can analyse large amounts of data, recognise patterns. Now you can just put some data in it and say, okay, find some anomalies in this data, the spreadsheet. You can give it a spreadsheet, find some anomalies of the data, which is the most common, and you can ask it just by free text and analyse the data for you.

AI can learn new tricks. So, if it doesn’t quite do what you want it to do, then you can retrain it. You can fine-tune it. You being in large transformation projects in the past, one of the biggest problems within organisations that people, have difficulty coping with is change. AI no problem, will change the new tricks, and it will accommodate change. It does not complain or need a coffee break. And again, slide Star Trek reference. It’s smarter than your average to trooper. I’m not gonna explain. For those who are not familiar with Star Trek, just ignore it.

Now that we understand AI, then let’s focus a little bit also, okay? How do we bring Dark Data back into the light? So one is on a strategic level, and it’s not necessarily AI-related. and then we’ll have a technical level or implementation level in implementing that, strategy.  So, on a strategy level to bring data back into the light. And remember, it helps you increase your maturity level of your organisation as well and your efficiency level.  And so, check the data culture in your organisation. Does your organisation has a data culture where they are aware of the importance of data, and that you have a data-driven organisation and a data-driven decision-making? And change that culture if necessary. Implement a strategy of changing that culture. Do you have a robust Data Lifecycle Management strategy in place? And when I talk about Data Lifecycle Management, then typically you have the different phases of Data Lifecycle Management, the data collection or capture. Then you have storing and maintaining the data you have, processing the data.  You have then sharing and usage, sharing and usage. Think about your reports, your business intelligence. And then lastly, you have the archiving and or deleting of that data.  So that’s the whole data lifecycle management process. So, make sure that you have a proper and robust life cycle in place. And each of those phases are properly implemented.

Break down any silos. So, if there are silos in your organisations, break them down and allow the data sharing across silos, obviously, you need to keep in mind regulation and compliance. But where that does not apply, just break those silos down and then raise awareness, which is kind of related to the culture where you raise awareness about the Dark Data and have people take action in fighting that Dark Data. And then, so that was the strategy.

And this is more of the tactics or the implementation. So how can AI, there are many, many tools that we can use to, fix, the Dark Data, and take Dark Data down. But in this particular case, we’re talking about AI enablement. And so where can AI enabled, I already mentioned a few like structured capturing the structure out of structured, but here are classify and discover data. So as the data gets captured, remember the lifecycle, you discover anything that is of value, and then you classify that data. And AI is very, very strong. We had it for a long time, but it was back then people called it, machine learning.  But Gen AI is also very, very good at this. Extraction of information out of unstructured data, like I mentioned, you have just a random document and you can ask AI to extract the relevant information out of that unstructured data. You have potential real-time. But have AI implement your governance and your data lineage.

You have automated cleansing, standardisation enhancement, the kind of data prep type of things that we used to do with very special data tools. Again, AI can do that for it. If it’s well instructed, well fine-tuned it is very, very efficient. It can do advanced analytics and insights generation. Remember when I said you can do anomaly detections, or you just gave it a data set and ask it to look through the data and find any interesting patterns, anomalies, all of these sorts of things. Again, AI very good at it. And you can even make your data better with AI, not just by cleansing it and standardise it and all of these sorts of things, but you can augment it. So there is this concept of RAG – Retrieval Augmented Generation where the AI can go out and fetch additional data from different sources. It could be the internet, but it could be also integrations with other systems where you can tell the AI, if you encounter this, get data from here and there and there, and augment that data. So, your data becomes even richer if it wasn’t already rich.

Some techniques that you can use to do all of these sorts of things automate the data discovery like I mentioned before. And there are many more. I will only highlight a few of them since, just to give you the potential because I don’t have a lot of time. I will go quickly through them and only highlight a few. We have automated data discovery. AI-powered scanning of your databases, file systems, data lakes. Well, if it’s Dark Data, then your data swamp. The automated cleaning, standardising and enhancing of data. Think about imputation. Like if there are some gaps in your data. You can have AI fill them, the normalisation of your, data error detection, like I mentioned before, data augmentation, where you can have the AI integrated with other systems, fetch it, augmented.

Then you have the advanced analytics and insights like anomaly detection, threat detection. You can visualise data. So, the newer AIs can just like generate graphs for you where you can give it some text. And based on the information that’s hidden within that text, you can ask it to generate a graph or an, or some kind of image that visualise that data. A chart, for instance, report generation. There is so many things you can do. Quality assessment where again, you give it the data, it sifts through it, and it will do the quality assist assessment for you. A lot of these things were like very manual-driven. Yes, we had tools, but it would still require somebody to do some pre-prepping of the data, and then the data need to be in a very specific format, and then the tool could then finally do its thing after somebody spent like an hour, if not more, to prep the data. But all of that is not necessary with Gen AI. Noise reduction get out all the uninteresting bits of your data. And then the last that I highlight, like I said, there are many more is the AI-powered governance and compliance. So, you can have automatic data lineage where the AI will track your data throughout your organisation. And ultimately, maybe also throughout the lifecycle, who in the previous light I talked about imputation. And the opposite of that is the data masking or noise reduction also where, particularly where you have data that contains like private information and you are not allowed to use that private information often, you can still use that data by masking all the private information. And even though all the private information is still is mask, you can then still use that, that data for analytics or other purposes and intelligent data policies. So, all these things will be able to help you unlock your Dark Data and ultimately increase the efficiency. Remember, Dark Data is kind of a measure in a sense of how efficient your and how mature your organisation is.

We have another quick poll. Which aspect of Dark Data within your organisation, if you are aware of it, holds the most untapped potential for your organisation? So, whilst you think about that, I will also continue to the next slide.

Some real-world examples. One of my projects I worked work for was a travel company and there are actually two issues where they had a huge potential of unlocking Dark Data. So, one issue was caused by the silos that I mentioned. They had silos, but those silos were created because of data sovereignty. So they were, they had to be GDPR compliant. And one of the requirements of GDPR is that the data needs to sit in the country or in the region where the data comes from. So, Europe data, that data needs to sit in Europe. American data needs to be stored in America. Asia Pacific data needs to be sitting in the Asia Pacific. And this case was Australia. And the problem with that is because it had to be sovereign. The data were sitting in silos. And the problem that they had is that their customers were business customers, like other organisations. And those organisations wanted to have a insight globally across the travel of all their employees, rather, they were in America and Asia Pacific or in Europe. And so, one way to overcome that is you can talk to these organisations and look, if you want, we can add value for you if you allow us to, aggregate that data. Because if they’re sitting in different locations, we cannot aggregate it with your approval. So, the organisation gets approval and can get the approval for, from their employees that they said, yes, it’s fine. And in GDPR, there is the, you can kind of store it separately, but with the consent of the, the owners of that data, in this case, the organisation, and just by simple, change or communication with the organisation, we could overcome that and we’re able to aggregate that.

The other thing is that they had lots of unstructured data, like invoices. So, part of their business is obviously they’re arranging the travels for organisations across the world, and they need to accumulate, or they needed to gather all the invoices from different places around the world. And each of their offices used this different, financial systems. So, the invoices were all in like different formats, and they had to extract that data to get some interesting insights or reports out of that data. But they couldn’t because the invoice data was in unstructured format. Now, with Gen AI, they have that potential to just gather all the invoice in, no matter what format it is. Is it PDF Word? No matter what the PDF structure is, the AI is able to extract all the necessary information, structure it, and store it in the database for virtual analytics. So that is one example where they can really utilise Gen AI to help out there. And previously that was on was not possible, and the invoices just sit there, and it was due to manual people kind of filling in and all. And we know that people literally do the minimal thing that they need to do. And lots of data was kind of lost because people only typing in the real bare minimum. So that’s one example.

Another example is a telco where I was, I used to work for a telco company long time ago. But this is just an example. They didn’t use Gen AI, but more machine learning. But Gen AI can do this as well, where a friend of mine was working in the networking part of that business. And he was telling me about a example where some of their routers were failing on a regular basis. And, and they had no problems, resolving the issues. And they used the logs to debug and to resolve the issues. But somebody decided let’s reuse AI to kind of go through these log files. And basically, what he managed to do is he managed to find a pattern hidden within the log files. And because of that pattern, he was able to actually predict when the next router would fail. And so, they would be able to anticipate a failure for a router just based on the log files, and they could then kind of automatically instruct some engineer to update or do some maintenance on the router to prevent it from failing.  And so this is another example where there is some hidden value within the data. And the data scientists that looked at the data didn’t even know what to expect or what to look for. He just used machine learning and AI to go through the data and find some patterns or some correlations.

Lastly, there are some risks that you need to, that I wanted to highlight. Ethical considerations, like privacy concerns, again, data sitting there. If we don’t take notice of it may become an issue later on. The accessibility of that data, who has access to it? So, if you have that data, you really need to take care of it. The transparency, the need for how the data is used, well, typically Dark Data is not used at all, but the transparency in the sense that people are aware that data exists at all. Retention, how long is that data stored? With retention comes also cost. Obviously, the longer you store it, then the more cost. And one thing that I also notice, the first thing that people do, if they cut cost, they say, okay, what do we don’t need? And if they see a monthly bill for storage, people say, why do we have that? Well, we have so much data on there. Is the data useful? Well, nobody is using it, and they tend to delete that data. And so with that comes the risk that if you just blindly delete that data because nobody’s using it, you can, you lose valuable data or you can use, lose the value that’s hidden within that data. So that’s another risk.

I hope you’ve been able to fill in the poll and, the aspect. So operational data, 20% communication data, 20% unstructured data, 30%, that’s also what I was expected, like documents and images and video. Traditionally, these data assets are really, really hard to process or capture the really valuable information out of them. But with Gen AI, that whole area gets just unlocked. Okay, thank you. I need to speed up a little bit. I’m a bit over time.

Lastly, what does the future hold? Well, more data is generated, and with that more Dark Data, and as you can saw the graph, it’s exponentially, but with Gen AI, it goes even further up. You must have seen all the data on the internet already, where you see how much of that data is purely Gen AI-generated. So, it’s called for a reason Gen AI, Generation AI. It generates even more. It’s not only human-generated data. Now you have AI-generated data, which will grow even more exponentially. That becomes an issue. And with that comes volume as well. Compliance, there are ever changes compliance like GDPR new, but there will be new policies in place, new policies for AI. They’re already talking about what AI is allowed to do and not to do, and what to process, not to process.  So, there will be more policies in place. AI is getting smarter as we speak. And so if you are already mind blown, but what Gen AI can do nowadays, think what it can do in a years, in 2 – 3 years time, and therefore it’ll be much, much more capable and much more easier to unlock your Dark Data with AI. And lastly, the tooling gets better. All the tools they get AI features, they’re better at integration with AI. And so, the tooling that you’ve already been using, the next generation of those tools will be AI-capable and be much more efficient and capable in dealing with Dark Data.

Conclusion, AI is a powerful tool. Like I already mentioned, unlocking the potential of Dark Data is easier than ever. You can pretty much throw any type of data structured or unstructured edit, and it will be able to take value out of it. Embrace AI to discover, analyse and leverage the Dark Data. So don’t be shy of it.  It is there and it’s getting better and better. And as AI technologies evolve, then with that more opportunities to unlock value from Dark Data, they will grow. It becomes easier, they become faster, quicker, and with that more value that can be unlocked. And with that, I would like to end the presentation, and I think we have time for some Q&A, I hope. Yes. Not a lot time.

Garima Dosi (Moderator):

Sure. I think at least we can take a couple of questions. So, one of them is Allan, how can we identify and prioritise which Dark Data sources to focus on within our organisation?

Allan Schweitz (Speaker):

That’s a very good question. I would say that it depends a little bit on your organisation, depends on the data, but the data that mostly aligns with your business itself the type of business you do, and your business model that data is more likely to bring value. So, if it’s like data completely unrelated to your business itself then it likely to have less value. And you need to kind of put some baseline for the alignment with your business and figure out, put some kind of criteria for the AI to figure out whether that data is aligned or not.

Garima Dosi (Moderator):

Okay. So that’s how you, but how will you identify? The first question is how do you identify? You’ve got a pool of Dark Data sources. What is the method that we can adopt to identify the Dark Data?  Some of them may be useful, which we are already using.

Allan Schweitz (Speaker):

Well, first of all, what you can do is, so one simple way of doing it is like if you know a source where it is, like say you have discovery was part of it. And I think this question is more about discovery. And so, you can have AI kind of go through your, for instance, your shared drive or your database, and then you can have the AI, every piece of data it finds you can have it write a small summary with very specific instructions. And then with that summary, put the source, and then you can in that way, list a summary of all the data that it has found it has encountered. And based on those summaries, you can then make your decision of which data is useful or not, and then instruct the AI to focus on that specific type of data. So, summarising all the, the data sources or the data in those sources is one way to get a quick sense, if you like, of what type of data is locked within that Dark Data.

Garima Dosi (Moderator):

Got it. Okay. So given the time today, I think we’ll just take up that question, we are sorry if your questions may not answered. But thank you Allan for enlightening us with Dark Data, especially with those examples that you gave. They were really good. And of course, the Star Wars, the analogy itself was really great.  Okay, so you can contact Allan with any queries or feedback on this session attechtalk@onepointltd.com, that’s on the screen and also onLinkedIn. As mentioned previously, a recording of today’s session and presentation will be made available to you on our websiteonepointltd.com. And also the link for the same would be sent to you post webinar.

[techtalk@onepointltd.com](mailto:techtalk@onepointltd.com)

LinkedIn[6]

onepointltd.com[7]

The upcoming webinar is a continuation from the last webinar about branches. So that would be part two of unleashing the power of LLMs through workflows and complex interactions. Part one was about direct interactions, which would be taken up by Gil Fernandez. And so, hoping to see you in the next webinar again. Have a good day. And bye for now. Thank you for attending.

Allan Schweitz (Speaker):

Thanks, everyone. Bye.

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

Gigaspaces[8]

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
[6] LinkedIn: http://www.linkedin.com/in/allanschweitz
[7] onepointltd.com: http://www.onepointltd.com
[8] Gigaspaces: https://www.gigaspaces.com/

## Metadata

- URL: https://www.onepointltd.com/techtalk/spotlight-on-dark-data-with-ai-replay/
- Last Scraped: 2025-07-02 13:23:43
- Content Type: Web Page
