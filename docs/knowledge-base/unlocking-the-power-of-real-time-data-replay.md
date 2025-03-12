# Unlocking the power of real-time data - replay — Webinar — Onepoint TechTalk - Onepoint - Do data better | Innovate with AI & more | Architect for Outcomes

Source: https://www.onepointltd.com/techtalk/unlocking-the-power-of-real-time-data-replay

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

## Unlocking the power of real-time data for digital transformation and AI decisioning

In partnership withGigaspaces Technologies, we bought together a panel of highly experienced digital transformation and data integration specialists to share practical tips, best practices, and actionable techniques for unlocking the power of real-time data for digital transformation and AI decisioning.

This event was livestreamed and recorded

1. Gain practical advice on utilizing real-time data effectively.
2. Learn the best practices for integrating and managing real-time data to drive digital transformation.

- How does real-time data enhance digital transformation efforts in various industries?
- What are the key challenges in integrating real-time data into existing IT infrastructures?
- What are the different case studies where real-time data significantly impacted business outcomes?

Danna Bethleham (Moderator):

Hello. Good afternoon, everybody, and welcome to today’s webinar hosted by Gigaspaces and Onepoint. We have some really interesting topics on our agenda today, focusing primarily on how to deliver digital services while interfacing with legacy systems that weren’t really designed to meet the 24X7 high availability expectations that customers and consumers demand today and we’ll also discuss how we can prepare our systems for AI driven growth and make sure that our data architectures are, full of purpose in the age of generative AI.

I’m Danna Bethlehem, and I’ll be moderating our discussion today. And with us, we have a stellar panel of data experts, who will be taking us through some real-life case studies, after which we’ll be opening up the session to some questions and, and a panel discussion. So let me just, introduce everybody before we get started.

Also, I just want you to note that if you have any questions, please, keep them for the end and feel free to submit them to the chat channel. So, joining us today, are Meni Miller, our director of Pre-sales firm, EA at Gigaspaces, Alexander Sasha Polev from Onepoint is the Chief Technology Officer, Shashin Shah, Founder, and CEO at Onepoint, and Dr. Madassar Manzoor, Solution Architect from Onepoint, welcome guys, and so pleased to have you joining us today.

So, I’m going to hand it over now to Madassar who is going to take us through some architectures and real-life case studies based on some, engagements that he’s had over the past few years involved in digital transformation, Madassar all yours. And just let me know when you need me to, transition the slides.

Dr Madassar Manzoor (Speaker from Onepoint):

I will do, Danna. Thank you very much. Thank you to Danna and thanks to everyone who has, joined us online. Thank you for making time to listen to this webinar.

Good morning, good afternoon, good evening, wherever you are in the world. I’m a solution architect working with Onepoint, and for those of you who don’t know Onepoint is a small IT consultancy based in London, and they specialize in working with tier one businesses around the world and helping them to successfully tackle their most demanding data integration challenges. What we have here today is a presentation that pulls together, a set of, if you like, universal challenges that we’re seeing everywhere we go. So, every client, regardless of the industry sector, regardless of the geographic region in which they operate, we are seeing these three, tectonic forces that you can see, shown on this diagram, digital transformation, channel proliferation and, real time AI driven decision management. These three forces are bringing almost tectonic pressure on, the workloads that are running on the operational systems. And it doesn’t matter whether your operational systems are in-house developed, Al COBOL kicks, applications running on IBM mainframes or DOT net applications running on SQL server, whether they’re packages from any of the big, vendors like Microsoft or Oracle or SAP or they’re applications that are either built for the web or have been migrated to the web. The challenge is the same. We are driving huge amounts of workload onto these applications.

So, I’ll just work around. So, we’re going to illustrate these challenges through some real examples, and then I’m going to briefly describe an emerging technology, which appears to have the ability to address all of these challenges, not just some of them.

So, I will start at the top with digital transformation. Almost everywhere we go, there is this relentless drive to push more and more, services into the hands-off customers or consumers. And those services are becoming more and more complex. So, the easiest way to illustrate this, if you imagine an online banking solution, when they first became available, you could go online, you could check your balance, you could make a utility bill payment, you could transfer money. Today, where many digital, applications our banking applications are is that you can apply for a credit card or a loan. You can upload all the documents that verify who you are, where you live, how much you earn, and you can get a decision, and the account can be opened without any human intervention. But you can imagine what a leap there has been in the number of systems that need to be touched and the number and size of transactions that need to be performed. So that’s what we’re seeing at, digital transformation.

Now, I’ll give you an example from our recent, client that I met with one of the largest, commercial insurers in the world, and they are talking about, so this is a business that ensures airports, car manufacturing plants, large shipping businesses that move thousands of containers. And what they’re looking at is moving away from the model that they have now where brokers, interact with them by telephone and by email to building a broker portal. So even in a non-consumer industry, you can see that digital transformation has an attraction. They want their brokers to be able to interact with them through a portal, upload applications, download contracts, and, underwriting decisions. So that’s at the highest level.

Then, at the next level in channel proliferation, again, I’ll probably use banking as an analogy here, but if you go back to banking in its earliest days, they used to have branches. Then they opened ATMs or introduced ATM, then they introduced call centers. Then along came, online banking then came mobile banking. And increasingly, the number of channels increases. I’m working with a, a utility company, and I only used to be able to interface with them, via call centre. Then they introduced an online form, then they introduced an online application, then they introduced a mobile application, and most recently they’ve introduced WhatsApp, they’ve had a chat bot for some time, but they’ve introduced a WhatsApp mechanism to interface with them. Now, what we see is, as the number of services increases, and we make them available in more and more places, that drives huge amounts of demand, much more demand onto the operational systems than they were ever intended to support. And the other aspect of this is that these systems that you see in the centre, they were designed for use by sales and customer service staff working in an organization, branches, or in their call centres. And now we’re pushing them into the hands of millions of customers that can interact with the business at any time.

And finally, when you are interacting with your customers, they, you typically need to make some decisions. The simplest example, if you remember when Amazon launched originally there were an online bookstore. And when they first launched, they introduced the idea of a recommendation engine where they would say, everybody who bought this book also bought these books. Everybody who bought this DVD also bought these DVDs. Now, if you extend that onto other industries, for example, in banking, they’re making decisions about whether a transaction is fraudulent, whether a transaction represents a risk, whether there’s money laundering going on. Then as you start to process, let’s say applications, they’re making decisions on whether to accept that application or not. So, the history of decision management is long and, protracted. But essentially what’s happened in this area is that initially people used to perform these decisions using business rules, yet simple logic based on analysis that they’ve done on the data. Then gradually people introduced, or organizations introduced, predictive models that were built with tools like SaaS or SPSS or more recently with R and Python. And now there’s a huge push, particularly in, the last few years to, move to machine learning for the predictive models, because the advantage of machine learning is that the models adapt as market conditions change, and as the customer behaviour change. And the biggest move has been with generative AI, and whether you are starting to use it or whether you’re just exploring it within a few years, this will be commonplace. Imagine when chatbots are replaced by generative AI and can have a proper dialogue with a customer and actually resolve their inquiries rather than just direct them to websites. And, imagine when machine learning algorithms are driving more and more decisions at the point of contact with the customer. So, if you look around this diagram, what’s happening is we have more and more services in the hands of customers. Those services are performing more and more complex operations. The customers are able to use them in more and more channels, and we ourselves are making more and more decisions while we’re interacting with the customer. But the problem is the systems at the heart were never designed for this level of demand and are struggling, are almost at breaking point with the scale of demand that’s being imposed upon that.

So, if we move on, so, I’ve got a couple of examples of the compromises that people make because the systems are unable to support the needs of, digital applications or real-time applications. So, this is a, grocery retailer, based in the UK that I’ve been working with for the last seven or eight years. They’re a very progressive and innovative business. They have a very advanced location planning, space planning, range planning, demand forecasting, they have automated replenishment. They have automated price change management. So, you can imagine that they are very sophisticated business, but they see themselves as a convenience store business at the premium end of the market, but still, Seven 11, you know premium convenience store business. And so, they never considered having a home shopping offering. But what’s happened since the pandemic is that every one of their competitors is offering home shopping and the consumers themselves, they’re even now buying fast food sandwiches, using home delivery services. So, this client was forced into delivering a solution, even though they essentially were not ready just due to competitive pressure. And the way they built the solution is if you imagine a home shopping solution, what does that need that needs details of the store from which you’re going to order the goods. It needs details of the products and the promo prices and the promotions that apply, buy one, get one free, spend 10 pounds, get two pounds off, whatever, or dollars in this case. They obviously need details of the customers. They have a loyalty scheme, so they need the details of the customer. But if you’re delivering, you need the details of the customer and the address to which you’re delivering. But the most important piece of information that a home shopping solution needs is the stock that’s available in every store. Now, unfortunately, I mean, this business has a very sophisticated stock management system, but it’s a back- office system. It does maintain a real-time view of stock, but it’s not designed for thousands of people to process hundreds of thousands of transactions a day or a week. So essentially the solution that they built as a compromise was to take end of day extract from each of these systems and push them into a home shopping, web application. And that application of has all of this source data, but then it also has the delivery slots. And then as customers buy and new customers register, it’s recording their details and it’s tracking their orders, processing their payments, and then it generates the pick list for the store. And, the collections and the deliveries for the company that makes the deliveries. Now, the dilemma for this application, and the downside with it is that when I come in, let’s say at two o’clock in the afternoon to, order some bread, some eggs, some milk, some orange juice, the, the, the stock levels that are visible in the system are the stock levels that existed at the end of the day yesterday. Right. So, I place my order, but what’s the chance that sometime in the afternoon or sometime in the evening, that those stock positions are accurate? And so, this is a solution, this is a problem that we see almost everywhere where people don’t have the confidence, clients don’t have the confidence to allow online applications to interface directly with their operational systems. Okay. So, this is problem number one.

This, application that I’m going to describe here, this is probably the most sophisticated business that I work with. I’ve been working with them for, 20 years. They’re one of the leading banks in the world. They regularly, win awards, both for the way their business operates, but also for their technology solutions. And gradually over the last 10 or 15 years, they first of all rolled out online banking and then mobile banking. And as I explained earlier, they started with very simple services, like check a balance, pay utility bill, transfer amount of money. And now, they are at the stage where 40% of all new accounts are opened online. 40% of all new accounts are opened online without any human intervention. Everything is done through the digital portal. But what this has done then, in the 20 years I’ve been working with them, is they’ve gone from, supporting 10 million very simple transactions across branches and ATMs and call centres to now supporting 200 million transactions a day just through their internet banking and mobile banking application. And the applications are complex. People are able to fill in an application form, upload, details of their, identity, their income, their occupation, their residence, any collateral that they’re offering for loans that they may be taking. And the system, processes these and, scores the applications and returns a decision. And if the customer then accepts, they open the account and send them all the details that they need to start operating. Now for this application to work, they have to have access. So, customers have to have access to virtually every single system within the business. I’ve only, drawn a subset of them. So, customers, core banking, which would be, term deposits and demand deposits, loans and mortgages, credit cards, and home and car insurance but there’s a wider, there’s 15 or 16 systems. These systems are all developed with DOT net and their legacy SQL server system. None of them were designed for millions of customers to be hitting them in near real time every day. So, what has happened, this blue box in the middle, very simply shown, is actually a very complex layer of applications. There’re four separate tiers of logic in there, and in front of every tier, there’s a, function, a service that does load balancing and another service that tracks resource utilization. So, there’s the web services application, and then, there are layers that, receive the web services requests and decide whether if microservices already exist, they’ll direct the request via, microservices. If microservices don’t exist, and we’re still using monolithic services or legacy applications, they direct those, requests accordingly.

So, all of these systems dotnet SQL server are absolutely pushed to the limit by the volume of requirements that are coming their way. And then to add insult to injury, that, as I said, this is a very sophisticated business. So, in addition to all of that, interacting with the operational systems, they have a hundred plus predictive models. For cross sell, for upsell, for limit increases, for assessing risk, for assessing fraud, for checking, money laundering. Right. So, and then they have 10 complex applications that are deciding what action to take based on the transaction that the customer has performed. And the results of the scoring that’s being performed, generated by those models. That’s where they are now. And like most very advanced businesses, they are now looking at how do we replace these hundred plus predictive models that have been written with SPSS R and Python, and how do we introduce machine learning for our predictive models, and how do we take advantage of generative AI, for example, to analyse documents that are arriving from customers? And how do we generate the contract that we’re going to send back to them? How do we replace our chat bots with much more intelligent and intuitive, chat bots that use, large language models to interact with the customer? So, the challenge here now is that this homegrown solution that is managing the interface between the client and the backend systems is it has hundreds of nodes in there, it has a huge degree of complexity, and then all of the backend systems are at the limit of what they can support.

So, what might the solution be to problems like this? So, I come to data integration from data warehousing, and the data warehousing deals with the challenge of data fragmentation and data latency by bringing data, into an operational data store. So, we build data integration jobs to bring data into what’s called an operational data store. And in this area, we hold the data from each source system in its original format without any cleaning, without any modification. And the idea is then this becomes the single source of data for building the additional layers of the data warehouse. Now, the advantage of this operational data store is that we are bringing data from source system with the frequency with which data is created. So, if a system is processing transactions in real time, we bring that data in real time. In addition, it might be that there are events that we’re interested in, so that’s not a transaction that’s being performed, but an event that’s happened. So, for example, a customer has, become overdrawn, or a customer has, closed their account, or a customer fills their basket and has failed to progress with a sale. So, depending on the frequency with which data is created in a system, we try, best practice to bring that into an operational data around. So, you might wonder, well, why don’t all these companies that have digital applications, mobile applications, online applications, why don’t they direct them to this operational data store?

It’s a single place where all of the data is, has been consolidated. And it’s still in the format that it was in the operational system. And the answer to that question is, enterprise data warehouses are analytical platforms. They’re designed for people to perform large scale analysis, complex, queries, huge amounts of aggregation and summarization, and therefore they’re unsuitable for running transactions where you need a real time, millisecond, you know, 5,000 milliseconds response time.

And no enterprise architect worth their weight would say, let’s run our, you know, business critical digital applications against this analytical operational data store.

So, what might the solution be if we move on to the next slide? So, imagine if we took that operational data store and we put it in, an in-memory database. A computer with a large number of nodes. With as much memory as we need to hold the data, but everything, so the processing and, the, the storage are all contained within that system, but the data is handled in memory. So, we replace that analytical, operational data store with a live, operational data store, but this time we only bring the data from each system that we need to service our digital applications. Right. We don’t bring in data warehousing. We bring everything that we would need for analysis and reporting. In this case, we only bring the data, and again, we bring it with the frequency that the data is created. So, the nice thing about this solution is these technologies exist and, if you have an environment like the one, I’ve described here, it’s highly scalable. If I need more processing power or more memory, I just add another node. It’s a cluster of computers. And imagine that if this technology also allowed me much as an Oracle database or a SQL database, might allowed me to have multiple indexes and perform joins and aggregations. So, I could do some of those things like AI or machine learning might require. Some of those decision management application. And then imagine if I could take my data and partition it across these nodes. So, let’s say I have 10 nodes and I have a million records or 10 million records, I can put a million records behind each compute node, and my queries can run in parallel. So just as they do in enterprise data warehouses. Now from an operational perspective, I’ve got a scalable, solution, highly scalable, because I can add as many nodes as I want up to the point that I’m willing to pay for, I can have as many indexes as I want, as long as I’m willing to pay for, the storage. And everything is in memory, and the compute and the memory are closed together. Then imagine at the other end, my digital services, my online banking or online shopping applications now issue their requests against this data store and receive their responses directly from it. They’re no longer interfacing with legacy applications, you know, whether they’re Salesforce, SAP, Oracle, or IBM mainframe, we have now disconnected the services from our backend. We’ve relieved the workload that would’ve been on the backend. So, hopefully that sounds for both of the applications I was describing. Hopefully that sounds like a suitable solution.

Now, if we move on to the next slide, imagine in addition to that, in-memory data store with all the functionality that I just described, parallel processing multiple indexes.If in addition to that, I could also bundle in, the data integration tools that I need to bring the data from my source system with the frequency that I want near real time event driven batch, or every 15 minutes micro batch, whatever it might be one side. And then on the other side, imagine if I could have a low code solution that could generate the APIs and build the microservices to allow my digital applications to interface with this data store. Wouldn’t that be microservices to for solving the problems that I articulated at the beginning, the fragmentation of data across, multiple source systems, the increasing workloads on systems that were not designed for that level of workload or to deliver, real time responses to millions of users in thousands of different locations. Okay. So, we move on. So, it seems that such a solution exists, and I will hand over now to Meni to describe that solution in a little bit more detail.

Meni Meller (Gigaspaces):

Thanks, Madassar, so what we’ve actually chose to implement is exactly the same architecture that Madassar, referred to where we bundled in all three layers of the in- memory data grid that resides in the hosting tier that’s capable of, executing business logic. It has a built-in event mechanism, and it’s actually not just like, an in-memory database, but it’s also, a platform for running a high-performance compute if needed. And, on the bottom, the orange part, the integrate part, that’s a part that is responsible for bringing in the data. So, we bundled in, we joined forces with IBM, so, and we bundle, IBM’s CDC. CDC stands for Change Data Capture. So, we’re able to replicate in real time event based, transactions in real time form various, sources into our system directly. And the system is built in an extensible way. So even if customers or organizations wants to ingest data from other sources, not necessarily from databases, maybe from, Azure Service Bar, so maybe from any, other source you can think of, then the platform is built to consume, Kafka messages. So, any kind of stream that, that can send data to Kafka, we get it and we’re able to ingest it into the platform. Once the data is in the platform, in, in our system, then we provide the replication capabilities. So, you can choose to either replicate the data into a similar cluster of the same technology like, our technology, like, the DIH that’s helpful for, geographic replication if needed, they have different, data available in different geographies to provide, low latency on that geography as well as middle everything that happens in that system into your choice of data store. It can be relational; it can be semi-structured. It can be whatever you like. And that way we can also provide point intime recovery, if we will. We want to go back in time, then, it’s something that we allow customers to do with the platform. On that part, the blue part where it says digitize, this is where we get, this is where we enable, access to the data. And even though it’s an in-memory data grid capable of, extreme performance, we provide a Postgres compatible, endpoint. So, every application with a Postgres driver can actually connect to the system as if it was, a Postgres data database and see the tables write SQL statements. It’s completely acid compliant, it’s transactional. So, you get both of, the best of both worlds. The data is also highly available. So, we store, the data, in a cluster, that, holds the data at least, two times. One is primary, another one is a backup and that way we can guarantee that in, in the event of a data node going down or something like that, then, a backup load is being promoted to being a primary. And, the service level, the SLA is not compromised. And this is extremely important because backend systems are not designed as Madassar said for use, for massive use coming from external clients, for end users. They go down for maintenance at sometimes, and, in some cases, they run a heavy batch and they become slow. and, and that’s where our platform compromises for that. Everything runs on Kubernetes, built on microservices, running on pods. and I think that because of, time constraints, maybe I’ll refer Madassar to continue or move on for the next, slide. So, if you have questions about the platform, feel free to send them in the Q&A. I’ll do our best, to reply on those.

And, we have a customer that’s actually an interesting use case to discuss. It’s, one of the top retail chains in the US. So, they have a lot of load, and they have a lot of end customers. And our walk with them actually started when they had a compelling event where they had to, depart from, another company that owned. And they had to very quickly create their own data store where they could, they will consolidate data, replicate data from systems that, in a few months are going to be gone for them. They cannot use them anymore. So, we stepped in, we created a data hub, replicated data from SAP, from Snowflake, from our databases, and more sources to create this datahub that they can work with. And once, it was a very small project in terms of the timeframe. It took only a few weeks, and they were up in the air working or portfolio operational.

And then, then we continued to work with them as they moved on with their, their, digital channels. And they had, they have use cases that require massive scale. And I think that one of the, best examples I can, think of is, their coupons mechanisms, because they gave coupons to their customers, and coupons are kind of like barcodes that they, the customers can scan and then get discounts. But they had to make sure that customers, for example, don’t replicate, don’t copy those barcodes and give it to their friends. And then at the same time, they, they try and go and use the same barcode, and we are talking about, redeeming tens of millions of coupons in an hour. This kind of scale. So they had to have a very strong coupon hub that is capable of both, getting the real time data about which coupons are available out there and provide, services that, for example, their email I’d get all the coupons that this customer has, for a specific coupon ID to, to do the redeeming part and, and, and make it very fast, queries about the coupons themselves, they try to do it in different ways, and they found out that they just cannot do it. And once they, with us, then again within a, it was implemented and they were able to do so, they, their picks, it says here, thousands of, of percentage to meet the shopping picks. And it is like exactly like that. We, we were able to provide the customer 360 view because the data is scattered across different, silos, but when it, when it’s consolidated in our platform, then we can be, very fast in responding with, with, this data. And one of the nicest path as well is that creating those APIs, the redeem API or getting the coupons for email ID is something that we are doing using low-code approaches. So, it doesn’t necessarily require any coding once the data resides in the platforms. So other than the coupons, they also created more hubs like order hubs, customer hubs, inventories, and they have plans to implement more and more such hubs. And this is exactly in line with what Madassar says, and it’s really, it’s really beautiful to see how something that we see the market is asking for. And once we’re able to provide that, then it works and it’s alive in production. So, this is about, that, specific customer, and, from here, I think we move onto the discussion.

Danna Bethleham (Moderator):

Thank you Meni and thanks Madassar. So, I mean, some really interesting, challenges and some solutions that we heard. And I really do want to open it up, to, questions now, because Madassar you presented some, you know, some more perhaps traditional approaches to how those customers that you shared with us, the retail grocery store, and the, the online bank, how they could have approached it. And my question is to you is how would, smart DAH or you know, data integration hub have, how could it have helped them, reach their goals more efficiently?

Dr Madassar Manzoor (Speaker from Onepoint):

So, if we take the retail example, the grocery store, retailers, if we had had a smart DIH, which we didn’t have. They could have used the CDC solution, which comes out of the box to bring data from the store system, the product system, the price system, once a day maybe. But, you know, stores don’t change very often. Products and promotions maybe change every few days. So, those changes could be event driven. So, you could say if something changes, propagate the change into the DIH, but the biggest thing we could have done is taken the livestock position from the ERP system. Remember that ERP system has a livestock position, but it’s a back-office system which tracks all the orders, which are placed with suppliers, and then all the deliveries that are made to their warehouses and then to their stores. And it also tracks all the sales, whether they’re made online whether they’re made in, bricks and mortar stores. So, if we could have had access to that system via, so a real-time feed from the stock system into the data integration hub, our home shopping application would now have alive view of stock. We wouldn’t have customers placing orders, which the store doesn’t, for products which the store no longer has in stock. So, it would’ve been a very, very elegant solution. In terms of the banking, example I gave. So that bank has invested seven or eight years of work and what they have inside that data integration hub is in a sense the same as, as the functionality that you’ve developed, but they’ve built it piecemeal and bespoke, and it, there’s a huge maintenance overhead to it. And of course, they have to build the interfaces to their operational systems and the interfaces to their web applications themselves. So, imagine the benefits that would accrue to them if they could just buy this off the shelf and focus on, you know, building the applications for online banking and mobile banking. They no longer have to invest the time and energy that they’ve taken to build that hub themselves. Additionally, all those DOT net SQL server systems, which are absolutely being pushed to the limit by the scale of, demand from digital application, that demand goes away. One of my favourite examples from your case studies is actually another bank, which has used the DIH to detect fraudulent transactions. So, before the DIH they were doing what, my two examples, they were running against the operational systems, and they would, after a transaction was made 40 seconds afterwards, they could determine whether that was fraudulent or not. After they put the DIH in, at that time, latency was reduced from 40 seconds to 50 milliseconds. So, while the transaction is being performed, they can detect whether it’s fraudulent or not.

Danna Bethleham (Moderator):

So that’s really interesting. I mean, what I got from you really, from the banking example that you gave is that, and we hear it a lot from the, organizations that we, we engage with as well, is that many of these organizations identify the need for, an online platform that can consolidate data and deliver data APIs in real time to digital services, and, meet these very stringent, millisecond response requirements. But they think that they can, many organizations, take a do it yourself approach and what, and, perhaps in the case that you mentioned the bank, where they have very large extensive IT teams, that could be a possibility. But many of the organizations that we hear from, don’t have the resources or the skill sets, to take on this kind of project by themselves.

Dr Madassar Manzoor (Speaker from Onepoint):

I think Danna, so sorry to, I think the issue wasn’t that they prefer to do it themselves. The issue was nothing existed at the point of time when they started, there was nothing that would solve the problem for them. So, they wanted to deliver, mobile applications digital applications. Those applications needed data, from systems from a fragmented set of systems, and they needed to deliver, real-time responses. So, while the customer is transacting, there was nothing that they could go and buy that allowed them to do that. Now if there is something that is demonstrable and proven to deliver that, why would you build your own? No one now, builds their own ETL tools. You go and buy an ETL tool or an iPath tool. No one builds their own Change Data Capture. You go and buy one of the, the leading tools. So, you know, if a solution exists to meet this need, why would you build your own? So, you can only build based on the knowledge of your one project. You know, my client only knows what they are doing. And what they need to do. You have experience of 50 or a hundred clients. And you can bring that knowledge back and incorporate it into a product.

Danna Bethleham (Moderator):

I see that we’re kind of running out of time quite quickly. So, I did also want to touch on the AI angle. And we have, Sasha with us and also Meni, and maybe, both of you can kind of, give them inputs around the gen AI aspect. So, I mean, how can gen AI, and AI in general, help these kinds of organizations, specifically consumer facing organizations, engage with their customers more efficiently? And what kind of challenges, would they face in trying to implement those kind of gen AI driven solutions? So, Meni, why don’t you go first and then Sasha can, give his, opinion on the AI angle as well.

Meni Meller (Speaker from Gigaspaces):

Can you come again? Because I just answered some questions on the Q and A.

Danna Bethleham (Moderator):

Okay. You’re ahead of us.

Meni Meller (Speaker from Gigaspaces):

And then there are a lot of those, so, okay.

Danna Bethleham (Moderator):

Oh, sorry. So, I was asking, about the gen AI angle. So, what kind of challenges would organizations face in trying to implement AI use cases in an enterprise environment in order to better serve their customers and clients?

Meni Meller (Speaker from Gigaspaces):

So, first of all, it, it’s a really good question. And I think that it’s important to distinguish between, interacting, using generative AI using, natural language with, semi-structured or unstructured, data and interacting with relational data. Because, when we want to have like an interactive natural language-based session with an organization, that is based on relational data, then we expect the results to be very accurate. And this is because when we query relational data, we send SQL statements that are very well designed, and we know exactly what kind of answer we expect to get from which system, and we expect it to be a hundred percent correct. While the benchmark for, translating natural language to SQL, the accuracy there, the industry benchmark is around 50 to 60%. So, I think that the main challenge over there is in two areas. One is about the accuracy. Understanding that the question and getting the right, statement that will return the right answer. And the second one is about gathering the related data into the place where we want to query the data from, right? Because the data is scattered across different silos and, being able to responder to utilize those silos, then we need to have some centralized place that understands which data relies exists well, at what structure and do some kind of mapping on that. So, I think this is the most challenging areas today to create a meaningful and accurate, LLM based, experience for end users.

Danna Bethleham (Moderator):

Okay. Sasha?

Alexander Polev (Speaker from Onepoint):

I’ll second that. In the main and AI space, I was saying the results you get are as good as your data and it didn’t change with advent of natural language model, the more accurate you can ask the question to the natural language models, the more accurate result it’ll give you. So, if you want to ask for, if, if you want to give your, customer best possible result, you better provide accurate prompt to AI because customer say something in his language. But before you ask it to other lab, you need to transform it to prompt, add additional data that create a context, basically create a vault about, around the question of the customer, and then send it to the machine to LLM. So, it can give the customer reasonable answer and not answer that just flag related to what he asked. And this is where like Meni mentioned, the data which resides in the fingertips of machine learning model that is available very fast. You can collect all of it bundled at the prompt and immediately sent to the lab. So, you can receive answer in near real time, not tomorrow. that’s where the main, the main value of, system like, unit basis come.

Danna Bethleham (Moderator):

I often think that we are at the very, we are at the nascent, stage of gen AI. And I think that there’s a quite a high, tolerance for inaccurate answers. But if gen AI is going to be implemented in a meaningful way in enterprise use cases, accuracy has to be at the top of everyone’s minds. And I think that, accessing and, you know, getting the context of many said, of structured data that resides in, enterprise data stores that’s going to be, kind of critical to making it successful.

Dr Madassar Manzoor (Speaker from Onepoint):

So, Danna, I have a slightly different view to, to the others. I, agree with them that, you know, if a customer is conversing, with a generative AI, you know, we may not necessarily interpret everything correctly, and we definitely won’t generate accurate SQL every time. So, my view is that microservices that interface with the DIH or the in-memory database, whatever we want to call it, are things that developers will have built, get the balance, transfer this money, put these items in a basket. There will be services that we have written with low-code, no-code application. I, my view is that in the first one or two generations of generative AI application, what will happen is, like today we converse with chatbots. We will converse with a generative AI, and we’ll say, can you tell me bank balance, can you tell me if I have enough money to pay my utility bill, which is $2,500, whatever it might be. Now, can you make that payment? So, we will be conversing with the, with an intelligent semi-intelligent generative AI, it will translate those into, now which web service do I need to run? Prewritten web service, do I need to run to be able to respond to the customer’s inquiry? That’s how I see if you like the first generation, let’s call it chat GPT five or six when they, well…

Alexander Polev (Speaker from Onepoint):

It’s, it’s already there. It’s called GPT functions. Yes. That’s exactly what GPT functions are doing. And I don’t think we contradicting, because even to invoke GPT functions, you need to provide correct context. And so, you need to find information about customers so you can, you can send it to this function right. Function by itself. You need to know who customer is, what his history is before you invoke his credit score calculation and things like that.

Danna Bethleham (Moderator):

So, I mean, bring us back to reality. I did want to also ask Shashin, some questions based on, the work you do with your customers. I mean, many customers start their modernization projects, under pressure to deliver very tight timeframes, pressure, you know, cost pressures. So, what advice can you give our audience and our attendees today in terms of the best way to approach these kinds of projects? In order to be successful, we all want to be successful and, it teams are no different in that regard.

Shashin Shah (Speaker from Onepoint):

Yes. So basically, our experience is that obviously people want to get the foundation right, before you start building everything out. And obviously you want to prove the value before you invest too much. So, we have an approach called Value path where within two to six weeks we can take a client through the whole process of actually understanding some important use cases, which could be prototype, it could be implemented, to then actually find out the value to the business and get that confirmation before one proceeds on larger scale implementation. And as I think as many illustrated the example of the US client, where within a few weeks they were actually able to get something deployed using SMART DIH is just a very good example. So, this is what we find basically, because technology actually you can make, can, can be, can, technology by itself will probably work, but within the context of the organization and where you can realize maximum value is what we want to get out of this exercise.So that’s what we do for all our enterprise clients. Basically, de-risk the delivery de-risk, making sure the foundation is solid before you start building further out. And it can be done within a period of two to six weeks from our experience.

Danna Bethleham (Moderator):

Okay. Good to know and sounds like very practical approach.Thank you, Shashin. So, I did want to open up the floor to questions, but I see that Sasha and many have been incredibly active having side conversations with our attendees. So, I’m going to put that to rest. Before we wrap up, I just wanted to give, Shashin and I just wanted to give a quick introduction to Gigaspaces and Onepoint, so let me just quickly share my screen again. And I’ll just go to our slide here. Shashin, do you want to take it?

Shashin Shah (Speaker from Onepoint):

Just at a very high level, I mean, we specialize in really solving very complex digital problems for clients. We come from an architecture background, so we understand how to get right the bigger picture, but also understand the business aspect and make sure technology is fully aligned. And so typically we would architect, prototype, build, and then manage complex solutions for clients. and really our core specialization isactually in the systems integration and the data management space. And there are some examples of key enterprise clients. And of course, without some key partnerships, we’re not able to deliver and deliver the right value for our clients. So, we have to actually make sure the whole ecosystem that we in interact with, including partnerships and clients, actually works end to end in order to deliver the value that we aspiring for clients. So that’s it.

Danna Bethleham (Moderator):

Okay. Thank you so much. So, Gigaspaces, we are a very long established, software solution, provider. Our specialization and expertise is really in, online data delivery and access. So, we’re actually pioneers in, in-memory data grids, delivering real time, extreme compute services to many customers, including financial services, insurance houses. The solution that we focused on today is our smart DIH. So, this is our implementation of Digital Integration Hub architecture, which is really designed to consolidate data from multiple sources, multiple enterprise legacy sources, into a highly performant hub, and deliver data APIs to consuming digital services, designed to support operational and transactional workloads like the ones that Madassar was describing. And Meni also showcased with the retail use case that we presented. And of course, we’re also, heavily investing in AI, specifically how to create generative AI, highly accurate generative AI responses based on enterprise data to serve, business use cases and enterprise use cases, within the enterprise. So just quickly, you know, we are very proud to serve, a very prestigious list of customers. As you can see here, fortune 500 customers, all of these customers rely on our technology solutions to run critical, and to run mission critical, services such as online trading for detection, scheduling, delivery services, real- time delivery services. So really, our technologies and solutions lie at the critical heart of global organizations and they rely on us for 24X7 extreme compute and, availability concurrency. So, I think that’s it for today. I want to thank again, all our attendees for joining us and I hope that you found it interesting. We will be sending out presentation to all people who registered for the, for the webinar.

And I’d like to thank our panel. You were great. Thank you so much. And hope we can do this again sometime soon.

Thank you everybody. Bye-Bye. Thank you.

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

Gigaspaces[6]

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
[6] Gigaspaces: https://www.gigaspaces.com/

## Metadata

- URL: https://www.onepointltd.com/techtalk/unlocking-the-power-of-real-time-data-replay
- Last Scraped: 2025-03-06 15:55:19
- Content Type: Web Page
