# AI and Master Data Management: A synergy for success - replay — Webinar — Onepoint TechTalk | Onepoint - Do data better | Innovate with AI & more | Architect for Outcomes

Source: https://www.onepointltd.com/techtalk/ai-and-master-data-management-a-synergy-for-success-replay/

_Onepoint - Our experience helps to solve questions related to on-prem or cloud; data strategy or governance; data engineering or analysis, delivering the best possible outcomes. Doing data better._

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

## AI and Master Data Management: A synergy for success

Are you ready to maximise the impact of your AI initiatives? Join Boomi and Onepoint for an executive-level webinar exploring the critical intersection of AI and Master Data Management.

This event was livestreamed and recorded

- Understand how master data quality directly impacts AI effectiveness.
- Learn strategies to create and maintain accurate ‘golden’ records.
- Discover new AI-powered approaches to simplify master data management.
- Explore best practices for synchronising master data across systems.
- Q&A session: Engage directly with our panel of master data specialists to address your specific challenges and opportunities.

1. Insights from real-world case studies demonstrating the impact of data quality on AI outcomes.
2. Practical approaches to overcome common master data challenges.
3. Introduction to Boomi’s cloud-based Master Data Hub.
4. Strategies to align your data management practices with AI initiatives.

This webinar is mainly designed for CTOs, CIOs, CDOs, and senior technology leaders overseeing AI and data management strategies. Business leaders will also benefit from the discussion, especially on the impact on business outcomes.

1. Dr. Madassar Manzoor, Principal Data Architect, Onepoint
2. Tom Clarke, Data Management Lead, Boomi

[cky_video_placeholder_title]

Slides

[AI and Master Data Management - A synergy for success - Boomi and Onepoint slides.pdf](/wp-content/uploads/2024/07/AI-and-Master-Data-Management-A-synergy-for-success-Boomi-and-Onepoint-slides.pdf)

Transcirpt

[AI and Master Data Management - A synergy for success - Boomi and Onepoint transcript.pdf](/wp-content/uploads/2024/07/AI-and-Master-Data-Management-A-synergy-for-success-Boomi-and-Onepoint-Transcript.pdf)

Tom Clarke (Moderator):

Hello everybody, and thank you for joining us on today’s webinar. My name is Tom Clarke, and I’m a Data Management Solutions consultant here at Boomi. Today I am delighted to be joined by Dr. Madassar Manzoor, who is a Solution Architect at Boomi’s strategic partner at Onepoint where we’ll be discussing AI and Master Data Management, a synergy for success. Madassar has over 30 years experience working as a data integration specialist, and prior to joining Onepoint, Madassar was a lead integration consultant for Teradata and IBM. He specializes in capturing business requirements, architecture solutions, and designing data pipelines to automate business processes and support data-driven decision making.

Onepoint is a data integration consultancy who are recognized as one of Boomi’s EMEA partners of the year for 2024. And over the last 20 years, Onepoint have specialized in helping large national and international businesses to tackle their most complex data integration challenges. Now, before we begin, if you do have any questions during this presentation, please feel free to drop those questions into the chat box provided we will see if we can address those at the end of the session, and don’t forget to use the links for additional information and content that we have provided.

So, I’m delighted to introduce Dr. Madassar Manzoor, who’ll be guiding you through the answer to how can my company avoid the risks of implementing AI with reckless abandon. Madassar, over to you.

Dr. Madassar Manzoor (Speaker from Onepoint):

Tom, thank you very much for the introduction and thank you very much to everyone that has joined us online to go through this presentation and actually thank you very much to Boomi also for allowing us to share this platform with you. I think the question that you posed Tom, how can my company avoid the risks of implementing AI with reckless abandon is a very important question. It’s very topical at this moment in time, and it’s my view, and it’s the collective view of the senior consultants at Onepoint that companies are rushing into implementing AI initiatives. Whether it’s AI applications or new machine learning models without really giving due attention to the underlying data that those applications will work on. And in particular, it’s our view that the master data that AI models will run against is not really fit for purpose, and this is a universal issue. Now, what I’m going to do over the next 30 minutes or so, 25, 30 minutes or so, is actually, give you an explanation or a justification of that assertion that I’ve just made and the way I’m going to do that if I move on to the next slide is, firstly, I’m gonna share with you our experience at Onepoint of the rapidly evolving AI landscape the things that we are seeing our customers either experimenting with or actually aggressively pushing forward to implement. And then I’m going to highlight real life examples of the negative impact of poor master data on the building of those applications, that poor master data. And by master data, I mean the data that you hold about your customers, your branches, your products, your employees, your suppliers.

So, if that data is of a poor quality, then it’s going to undermine the value of the AI applications that you’re building. Now, as you’ve just explained, Tom, I have over 30 years experience in this industry. I actually built my first single view of customer and single view of product back in 1992. That’s a scary 32 years ago. And so, there’s very clear precedence, very clear guidance on best practice for creating and maintaining accurate master data regardless of the domain that you’re working with. And then in recent years, there’s been the introduction of AI functionality that can help actually to accelerate the cleaning and matching of master data records. Now, once I’ve covered all of that, I’ll then hand back to Tom to provide an overview of how Boomi’s Master Data Management Hub or Master Data Hub actually can assist you in meeting all of these requirements to deliver high quality master data that will then help improve the effectiveness of your AI applications.

Let me begin by just sharing our experience at Onepoint of what we’re seeing happening in the AI industry, I’ll call it the AI sector. Now most of you will know that probably prior to the pandemic AI was something that people sort of talked about, but anything that was being done was very tentative, very experimental, very exploratory, and people may even take 12-18 months and deliver very little from it. And then at the end of November 2022 OpenAI launched ChatGPT based on its Large Language Model, GPT-3, and suddenly everyone from the lay person industry to people at the hyperscalers suddenly became aware of what this technology can do. It’s a really fundamental mind shift. People suddenly began to see the improvements in productivity, the improvements in efficiency, and the improvements in decision making that can come through the use of AI. And now what’s happened is there’s almost like an arms race. Everyone is charging headlong into building these applications, and they’re not giving due consideration to what it will take to make those applications successful.

But let me just, I’ve tried to categorize, there’s such a plethora of AI applications now under consideration or under development, but I’ve tried to categorize them in these seven categories. Now, I won’t have time to go through all seven, but I will just pick out a few as illustrative examples. So any of you who have called a telco or a broadband operator or utilities company and been confounded by the menu options on the voice response system, or the lack of functionality on the chatbots online. You’ve just gone round in a loop and either been referred back to a website or being asked to call a number to speak to a human being. You’d be pleased to hear that the Large Language Models ChatGPT-4 and it’s, you know competitors Gemini, Llama, they’ll give people the ability to build chatbots that you can communicate to with in natural language. And they’ll be no more menus, you’ll speak in natural language. You’ll say, I want to have a billing inquiry. I want to request an engineer, and the chatbot will enter into a natural language conversation with you and resolve that query. There will be no more hands offs, no more, let me, you know, call back. These chatbots will be as proficient as experienced customer service reps who are either working through scripts or working through knowledge. So, that’s one of the biggest things that’s coming.

The second thing is that in almost every industry that we work with, still a substantial amount of work happens with documents. It may be application forms it may be proposal documents, proof of identity, proof of address, proof of income. And what’s happening is the Large Language Models will now automate the processing of those documents. They’ll troll the document, pull out the useful information, input that information, or transfer that information into risk assessment or underwriting systems, get the decision back and then generate the contracts. All of this is actually in development and in work now.

Now, the area that I’ve worked in mostly over the last 30 years is item number three, the predictive models, where we’ve been building models to predict cross sell, upsell, churn to assess risk, to detect fraudulent transactions, to predict demand of products, or to automate the replenishment of stock in stores. All of these models historically have been through an evolution that used to be based on simple rules that an analyst like myself may have defined. And then statisticians came along and built these models with SaaS and SPSS and more recently with Python and R. And now the next generation is going to be based on machine learning. And you may wonder, well, what’s the advantage of that? Well, there’s a very simple advantage. The models that we built historically were built on small samples. They took time to build, and then the models were static. So I have client with 30 million customers, we would use 30,000 records to build the model and maybe another 10,000 to test the model and tune it. And then the model was fixed until two or three years later when we updated the model. What will happen with machine learning, it will be able to use all of the data. And then it will evolve as the economic circumstances change, as the customer’s behaviour changes, the models will evolve. They’re called adaptive models. So that’s the real value that AI will bring to this market.

Now, I could go through all of the others. I’ll just go right down to the bottom and give you some of my favourite examples where sensor data, image data, video data, is going to be used by AI and is already being used by AI to help improve business performance. So, one of the biggest areas is predictive maintenance. Many of you may or may not be familiar with the fact that Rolls Royce makes jet engines for aircraft. You may not know, but from the moment an aircraft with a Rolls Royce engine takes off to the moment it lands there are sensors, temperature sensors, pressure sensors, airflow sensors, fuel flow sensors that are monitoring the performance of those engines. And by the time, and they’re monitoring in real time by the time the plane lands, the engineers already know what maintenance is required, what parts need maintaining and what parts need replacing. In London, on the London Underground, there’s an AI app that is used to track the braking distance as trains approach underground station. And that app is used to determine when a train needs its brake servicing. And I have a retail client, which is in the early stages, it’s going to use images of every shelf in every store to detect when the products on the shelf need replenishing. If there’s not enough product on the shelves, it impacts the, the sales performance of those organizations. They’re going to use image data.

I have countless more examples. I could easily spend 30 minutes discussing just this topic, but I will move on. But before I’ll move on, I just want to make one point. If you go through this list of applications, if you imagine if I’m trying to cross sell or upsell, I need accurate customer information. If I’m trying to forecast the demand of my products and automatically replenish the stock in my stores, I need both store information and I need product information. If I’m trying to optimize the productivity of my employees, I need employee data. And if I want to manage the performance of my suppliers, I need supplier performance data or supplier data.

And as I’ll show you on the next slide, the challenge we have in our industry is that this master data relating to customers, branches, products, employees, is actually much weaker than most companies are willing to acknowledge. In fact, I would say I see two branches of thought in the clients I work with. On the one hand, there are clients that are in denial, and they’ll say, no, no, no, there’s nothing wrong with my master data. And on the other hand, there are clients that have accepted it’s poor, and they just have huge labour intensive workarounds to deal with the fact that it’s poor. And I will just use a single example possibly for each of those items just to illustrate to you what we see in our client base and in the market. So, some years ago I worked with a Danish bank and we were going to build cross sell, upsell, churn models for them, obviously customer data. And you know, I put down the requisite that we have to have accurate customer data. The bank was absolutely adamant that they had a clean, single view of customer, because every customer in Denmark has to provide their social security number. When we started to analyse the data, we found hundreds of thousands of records where the social security number was 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 1, 2, 3, 4, 5, 6, et cetera.

And so even though the bank had the perception that it had accurate customer data, there was no validation on this field. And so, it was totally unreliable. Right now, I have a customer that’s implementing a website for a retail customer. It’s implementing on its online website, the ability for customers to register for a loyalty card and to download a QR code that they can use until the physical card becomes available. The interesting thing is, you go on the website, you enter this data behind the scenes, the data is actually printed off and passed to the CRM team who are implementing a Microsoft Dynamic CRM system. And they re-key the data into that system, but there’s no validation that the customer’s already on the system or the customer’s date of birth. So, they’re creating customers who haven’t been born yet, and they’re creating customers that are 120 years old. This is the challenge that we have even today, 35 years after we recognized the need for a single view of customer product people still don’t have the quality of data that they need.

I worked on a financial transformation project with one of the biggest fashion retailers in Europe. And when I was working around the finance team, I found that there were five different teams. So, there was a team responsible for branch performance, comparing each branch with the best performing branch, there was another team that was responsible for return on investment, a third team that was responsible for the operating costs, the rent, the rates, the utility bills, the security costs. And another one that was responsible for let’s say the performance related pay. And every single team had its own version of the branch data and the branch hierarchy. I’ll go down to the bottom. I could give you examples all day long on this subject.

At the bottom, one of the biggest retailers in the UK, I met with the director that was responsible for supplier performance. And he said to me in his opening sentence, I have between 4 and 6,000 suppliers. And initially it didn’t register with me, then I turned around and said, you don’t know how many suppliers you have. And he said, yep, my estimate is between four and 6,000. I said, please just unravel that for me. He said, well, I have many departments in my business and the buyer responsible for those departments buy from very large companies like Samsung or Sony or Bosch, whoever it might be. And so the buyers in my department deal with the, if you like, the salespeople in the divisions of our suppliers. And as long as the buyer can place an order and the supplier can raise an invoice and get paid no one cares. But he said, I can’t manage supplier performance if I don’t know collectively, Bosch whether they deliver products on time, whether they deliver or the quantity correctly, whether it’s packaged and labelled correctly. Whether they have faulty products and the extent to which we have to return things. So how do I manage a relationship that might be worth a billion pounds a year when I don’t actually have an accurate view of how that supplier is or we’re doing business with that supplier.

So, on the right hand side of this slide, I’ve tried to summarize, I’ve called it the universal weaknesses in master data. And we see this everywhere we go. That master data is recorded in multiple systems and each system, it has different table or file structure. So the fields that are kept, the data items that are kept are different in each system. And then the reference codes that you might use, for example, for gender, marital status, country code, they vary from system to system. And many systems just use free text. And then there’s no controls to prevent duplicates. There’s no controls to validate data like social security number or date of birth. And then the biggest two problems, the hierarchies tend to be maintained in spreadsheets rather than systems.

And once we do get a clean view of data, there’s no attempt to synchronize it across all the system so that every system has the same view of the customer or the product or the branch. So, these are the underlying weaknesses. And to be honest, they’re not new. We’ve known about these for a good many years, and I’m going to illustrate how not dealing with these issues are not implementing solutions, how that impacts businesses.

This is an example from a building society in the UK, one of the largest in the UK. And what they do is every week they run a campaign to people who have been on a fixed rate mortgage, and that mortgage is going to expire that fixed rate within the next four weeks. And I went to see the head of this team on a Monday morning, and I actually went to see the CRM system, the call management system that they use, and nobody was making any calls. I sat down with the manager, I said, what’s going on here? He said, well, what happens is we get a list on Sunday. It’s generated on Sunday, and we spend the whole of Monday validating the list. And then from Tuesday we start making calls. I said just elaborate on that for me. So, he said, he brought out a list from three or four weeks earlier, and he said, look, this list had 96 names on it. And I forgot to mention that this client, I was working on a data warehousing project for them, had refused to accept that they needed a single view of customers. They said a bank, we’re a bank. We collect national insurance numbers. We are confident that we have an accurate view of our customer, anyway, let me go through it.

I won’t go through all of this and labour it, but there were 96 names on the list. The first thing is that there are 20 duplicates. So, immediately we don’t have a single view of a customer. Then 13 of the customers on that list had no mortgage so how on earth have they qualified for a mortgage redemption or renewal campaign? Then 19 out of the list, 20% had already redeemed their mortgage, they’d paid it off, or they’d moved it to another business. And then this is a telesales list, an outbound telesales list. Telemarketing list. 4 of the records had no phone number and seven of the phone numbers were invalid. I won’t go through the whole list and labour this for you, but the interesting thing is, at the end of it, they actually had seven sales. And when marketing looked at this and said, wow, we’ve got 7% take up rate, this campaign was considered a great success, but just look at all the data quality issue that I just highlighted. All the challenges that come from not having reliable single view of customer.

Now the next one is even more insightful. So, this was a company that had spent several tens of millions of euros. This is one of the largest fashion retailers in Europe. And they had spent tens of millions of euros implementing a new ERP system. And when I sat with them and said, do you have a single viewer product? They said, oh, absolutely. It’s in our new ERP system. But when I looked at the ERP system, the data in it was set up by buyers, and they only put in the data that they were interested in. So the style, the size, the season, the colour, the fabric, the quantity that they’d be ordering the delivery dates for the orders. Then as I went round the organization, the team responsible for the Till system, the point of sale system in the stores, they actually added in their own system what are called EAN codes, barcodes, you could say product identifier. Then they added the short descriptions that need to go on a receipt. And of course, they added price and promotion data, but as you can see in big red letters there, or purple letter, no VAT. And then as I went round, the other teams, like the space planning team and the warehouse merchandise, they were all in their own systems adding additional data that wasn’t in the master data view, if you like.

So the space planners were interested in is the, is it a hanging garment or is it a package? Does it go on hanging? Does it go on shelves? Does it go on tables? And the warehouse was interested in what’s the size of the boxes that arrives in and what pre-processing do we need to do? Do we need to iron it? Do we need to put, price labels on it? You can see, even though the perception was we’ve got a single view of product, actually the data was fragmented across lots of, different system. And one of the fundamentals for not having, if you like, a single view of product was this issue that I’ve highlighted that they didn’t have VAT on their point-of-sale system.

If a customer came in and let’s say they bought 10 hoodies for a team meeting, and they needed a VAT receipt, there’s no VAT shown on the till receipt. They had to go to the customer service desk, fill out an online form, that online form was sent to finance, finance would generate the VAT receipt and email it back. And you would not believe, and I won’t go into the detail of the amount of work it took to do the VAT calculations at the end of every period, at the end of every month, and then the VAT submissions at the end of every quarter. But, you know, it was a very, labour intensive, spreadsheet focused, exercise where total sales came from the financial system, and then sales of products that don’t attract VAT came from the data warehouse, and then the two had to be combined. And this had to be done country by country because the VAT rates vary by country.

These are the kinds of problems people encounter. And they just live with them. The first client was living with the fact that they have poor quality data in their, marketing campaigns. And the second one is living with the fact that their product data is fragmented. And over the years, I’ve accumulated countless example, but let’s now move on to what you can do about it. And I am running out of time and Tom will have to prompt me.

The first thing that you’ll, discover when you decide that you want to build a single view of customer or product or supplier, is actually there is dirty data everywhere. And I’ve in 30 plus years, found a dirty data in every single table, in every single system that I’ve ever looked at.

Here’s just an example. This is an NHSA health service provider based in London. They have 160,000 records on three or four patient administration systems. And this analysis that you can see on the screen was done after the NHS. The National Health Service had spent 30 billion pounds, probably 35 billion euros on an IT program for the NHS. But this is just one field. This is the title field. The values in there should be Dr., Mr. Mrs.  We found 755 distinct values. More than a third of the records had nothing in that field. Many I had to remove the numbers had dot dot dot dash dash dash, if you look at the fourth line down, comma Oss comma R comma Rs, this is somebody, pressing the key next to the m. So the first one is miss, the second one is Mr, the third one is Mrs. They’re just not paying attention and touching the wrong key. And then the bottom four or five examples show you that actually the users of this system, saw no value in the title field. And so they used it to record information that was useful for them when they’re dealing with the patient, because the first screen that you see has this information on it, so they can immediately see, oh, this is a refugee, or, this is the husband, or, you know, as you can see, a date of birth or where they live. So, this is problem number one.

Problem number two is this, that people hold, they use different reference data standards on every single system that they work with. And to be able to match and merge inconsistent records, we have to take that, those different coding standards and map them to a single format or single standard. It’s called believe it or not, standardisation. And the only example I’ll highlight, you can see for yourselves, the examples that are highlighted here. But if you look at the bottom one, the NLD, Holland and Netherlands or Netherland all being mapped to NL. This actually comes from a media company that sells newspapers, online content, advertising, seminars, conferences, and on one of their sales systems, just one, they had 40 different ways of representing the Netherlands. Imagine if you are just looking at that Salesforce system and saying, tell me all the customers that I have in, in the Netherlands, and let me try and now identify the cross-sell opportunity, the upsell is almost impossible. So this is standardisation. And the next slide, and I’m sure I’m running outta time.

This is the biggest problem that you’ll contend with when you decide to go down the route of actually trying to improve your master data. This is actually from a real customer and all, I’ve done a real client, I’ve replaced the names of, the customer with my name, and I’ve tried to highlight in green the kind so you can see on system one, there were three copies of the record for the same customer on system B there was one record on system C where we received a file, a delimited file. There was one record. But the kinds of issues you can see on the second row, you can see a letter missing in my first name and the Z and the N transposed, and then the date of birth instead of being 01 has been transcribed to a 10. And this is what comes of manual data entry. You can see, in the fourth record down, a third record down, the email address field actually contains a phone number. And in the fourth record down, you can see that somebody’s been just pressing the N key because it’s right next to the M key. These are the common problems that you experience when you are trying to match and merge records from multiple systems.

The process that you go through when you want to, build a clean single view of customer product, branch, whatever it might be, is this, you extract data from each of the systems where that master data is held. And the most important part of the whole process is that second, arrow data profiling. Data profiling is the process of analysing every column and trying to understand the, the distribution of data in that column. So, you want to know how many records are in the file, how many unique values are in the column, what aspects of that data are dirty? What aspects of that data need to be standardised? What kinds of mis keying can I identify? If you don’t get this piece right, the rest of it will fail.

As with all design processes, you know, this is where the lion’s share of the work should be understanding the data, understanding where the problems are in the data, where the duplicates are, where the core data quality issues are. Once you’ve done that, you can then define the cleaning rules, and you can define the standardisation rules. Once you’ve done that, the next step is to say, okay, now I’ve worked with my data. Is there any external data I can acquire yet to enrich my data? And the kinds of things people buy are address files, gone away files, which is people have moved, mortality files. From companies like Dun and Bradstreet who can buy a company register, including the company hierarchy and their office locations.

But let me put some flesh on the bone of this example with this, client that, Onepoint has worked with. This is a municipal council in the UK. They have half a million residents. And what they wanted to do was find, if you like, revenue leakage, where are we losing potential, council tax income from residents or business tax income from companies. The only data that they had themselves on the left hand side is the property occupancy. So every person who lives in a residential property completes a form to say where they live, and every business completes a form to say where they operate from. Now, once that data was in the system, we then acquired the post office address file for every address within the, catchment area of this council. We then went to company’s house and acquired the details of every company that has offices in this council area. And we did the same. We went to the charities commission, and then we went to Yell and found all the local businesses that were registered in the area.

We went through all that process that I’ve just described in ingest the data, clean it and enrich it, match it, merger it, and then generate what are called golden records. This is your clean, reliable version of the customer. Now, when the, finance department at this council set out this data, they very quickly found, oh, we’ve got 1600 businesses, operating out of what we thought were empty properties, and we’ve got two, 2,700 businesses operating out of residential properties. And there were three or four other KPIs that they uncovered. And what they discovered is that if they collected the correct business rate from those companies, they could actually increase their revenue by 25%. This is the real value of one cleaning your data and two, enriching it.

The process continues after I’ve enriched it. I now need to design the data model that I want my customer or product or supplier data to sit in. The term canonical here basically mean it’s a super set. If you go back to that example of product data being scattered across multiple systems, when I bring it into my master data system, I want the super set of attributes. So I need to design the canonical model that will hold that, and then I can progress with a matching and merging the duplicate or matching record. Now, in the middle there, you see something called a match pool, and I will use the next slide to illustrate that.

Again, this is one of Onepoint’s customers. It’s a travel business. It does 10 billion pounds business a year, and it operates across all the, western European countries, right? And across those countries, it has 60 million customer records. Now, imagine if I’m going to try and match, so I find a record, am I gonna try and match that record with every one of the other 60 million records? No, I’m not. I’d never finished the exercise. The process is you define a match pool. So for this record, what’s the group of records that I want to compare it with? And that group has to be small enough to run the comparison quickly, but big enough so that you’re not losing any potential matches. You might say, well, it’s a multi-country system, so at least let me go down and do this country by country. Then let me take maybe the first initial of the customer, and then let me take maybe the district in which the customer lives. Just as a very nice, and this is a way of narrowing down the, the group of records I’m going to compare.

And then there are a number of techniques for doing the comparison. If you’re lucky, you’ll get an exact match. More likely than not, you’ll have to do something called fuzzy matching. And fuzzy matching is comparing how many characters are the same. If I transpose them, does that make it the same? If there’s a character missing, if I inserted it, does that make it the same?

And then the next level is phonetic. So do the two, does manzu and mansour, do they sound the same? You have to use combinations of these techniques through trial and error testing to arrive at a solution. If you look at the leading products in this sector, they say, oh, we also do probabilistic. We use probability to do the measurement, to, so you might use linear regression, you might use some kind of discriminant factor analysis and build models to say these two records are the same. But actually in my experience, I’ve never come across anybody that does this. And what’s gonna happen in this industry is we’re going to leapfrog this and go straight to machine learning.

Once we have all of that in place, we can implement or deploy our solution. And essentially I put all the pieces together that I’ve just described. And the most important thing is when we are checking the data and cleaning it and standardising it, any serious data quality issues, we will produce data quality reports and let data stewards go and investigate them and rectify them on the source system. And then when we do the matching, there will be things that we know, yep, this is a firm match and this is not a firm match. They can go through automatically, but there’s a gray area which we call suspect matches, and they get handed off to data stewards. And the data stewards will then investigate the underlying record and decide whether to accept or generate the join or the merge. Finally, we will end up with golden records. Now, something I always advise my customers to do is once you’ve arrived at the golden record, keep the original records, have a mapping from the golden record to the original record, so that if ever you have to, if you like unmerge the original records are still available. If I get rid of those, how do I unmerge?

And then finally, the biggest most important thing that you can do is close the loop. So, there’s no point having all my clean data sitting in a master data management system. I’ve got to send it back to all of the systems that need that data. And again, this is one of our clients, they, have solar farms around the world, 160 of them. And basically, and it’s a good example because it differs from all the master data that I’ve been describing, they’re interested in the sites or the locations where they have solar farm, the projects to build and maintain them, the IT systems that run them, and the legal entities or the businesses that own each. So essentially we pull all of this data in, using Boomi, we use the Boomi Master Data Hub to clean and match and generate the golden records. You can see any records that we can’t match ourselves or that have serious data quality issues, we send to data stewards. And then finally we write everything back. The top three systems have, employee, they call it people, but employee data. So, travel booking system, travel expense system, employee survey system, and then IFS is the asset management system. And the feed down to Azure is the feed onward to their Snowflake data warehouse. So all of that golden data gets passed to their data warehouse.

Finally, I promise you, I would tell you, where AI is going to play a role, and this is what’s happening. So AI, so not only is Master Data Management going to enable much more effective AI application, but AI applications themselves are going to help improve master data. I dunno if you call that virtuous circle. The first part of this process is data profiling. And my view is this should stay manual. Manual in the sense of using a tool to understand the data, to understand where the data quality issues are, where the duplicates are, where the standardisation is needed. But now what will happen is that data profiling will generate the training data for AI models. Then when I come to the next stage and I need my canonical data model, guess what? I’ll be able to go to Llama or Gemini or ChatGPT and say, here are all the subsets of data I have about my products. Can you gimme a canonical model? And by the way, I want a mapping to the original data as well.

As we get into the cleaning, standardisation, matching and menu, we will use machine learning models built on our own data to enhance that. And it may be that a company like Boomi comes along and says, actually, we will have a cloud-based solution where every client’s rules and learning enhances our central solution. So the next client that comes along takes advantage of all of that learning that’s all already embedded in our solution. I must apologize. I’ve taken substantially longer than I should have done, and I’m now going to hand back to Tom.

Tom Clarke (Moderator):

Thank you very kindly for that Madassar, I think that you personal use case is always great. I think they’re really, replicated with the audience we have with us today.

Based on the content that you’ve actually provided, Madassar, I do believe that the audience could probably answer this question now is how can my company profit from the AR revolution instead of being left behind?

Well, as Madassar is quite clearly pointed out, data is everything and clean data is of the utmost importance. And that’s especially prevalent for, AI. Ultimately, if you are gonna be providing your AI agents with poor data, you’re only gonna receive poor results as we can see.

So why not utilize a platform that can fully unify all of your data sources with its breadth of connectivity, ease of use, and even master data management functionality built in. And then taking that even one step further, how about embarking on your AI journey with a unified AI ready platform that can integrate all of your varying data sources to feed your AI models and agents with quality business data? Boomi has just released six active AI agents to help IT developers autonomously design, manage, and orchestrate digital cohesion. So get in touch with Boomi or Onepoint and we can discuss this in more detail and guide you on your synergy for success.

That’s gonna be all from myself and Madassar. Any questions that we’re at, we’re not answered as part of the webinar, we can send responses to those after the webinar has completed.

And if you want some more details, on Onepoint, we have the slide available for you here. So if you want to get in touch, understand a little bit more about Onepoint how our partnership with Boomi and how we can both help synergize, it would be great to talk to you all.

And on that note, I’ve been Tom Clarke. Thank you again, Madassar, for joining on the call and providing some great use cases. We’ll see you next time.

Dr. Madassar Manzoor (Speaker from Onepoint):

My pleasure, Tom, thank you very much. Thank you to everyone for attending again. Bye-Bye.

Tom Clarke (Moderator):

Goodbye all.

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
[6] Gigaspaces: https://www.gigaspaces.com/

## Metadata

- URL: https://www.onepointltd.com/techtalk/ai-and-master-data-management-a-synergy-for-success-replay/
- Last Scraped: 2025-07-02 13:22:44
- Content Type: Web Page
