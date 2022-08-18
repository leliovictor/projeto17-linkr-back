CREATE TABLE "users" (
	"id" serial NOT NULL,
	"email" varchar NOT NULL UNIQUE,
	"password" varchar NOT NULL,
	"username" varchar NOT NULL UNIQUE,
	"pictureUrl" varchar NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "posts" (
	"id" serial NOT NULL,
	"url" varchar NOT NULL,
	"message" varchar NOT NULL,
	"userId" integer NOT NULL,
	"likes" integer NOT NULL DEFAULT '0',
	"createAt" TIMESTAMP NOT NULL DEFAULT 'now ()',
	CONSTRAINT "posts_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "hashtagsPosts" (
	"id" serial NOT NULL,
	"hashtagId" integer NOT NULL,
	"postId" integer NOT NULL,
	CONSTRAINT "hashtagsPosts_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "hashtags" (
	"id" serial NOT NULL,
	"hashtag" varchar(255) NOT NULL UNIQUE,
	CONSTRAINT "hashtags_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "postsUsers-likes" (
	"id" serial NOT NULL,
	"userId" integer NOT NULL,
	"postId" integer NOT NULL,
	CONSTRAINT "postsUsers-likes_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "followers" (
	"id" serial NOT NULL,
	"request" serial NOT NULL,
	"requested" integer NOT NULL,
	CONSTRAINT "followers_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "coemments" (
	"id" serial NOT NULL,
	"postId" integer NOT NULL,
	"userId" integer NOT NULL,
	"text" varchar(255) NOT NULL,
	CONSTRAINT "coemments_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "reposts" (
	"id" serial NOT NULL,
	"userId" serial NOT NULL,
	"postId" integer NOT NULL,
	"createAt" TIMESTAMP NOT NULL DEFAULT 'now ()',
	CONSTRAINT "reposts_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "posts" ADD CONSTRAINT "posts_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");

ALTER TABLE "hashtagsPosts" ADD CONSTRAINT "hashtagsPosts_fk0" FOREIGN KEY ("hashtagId") REFERENCES "hashtags"("id");
ALTER TABLE "hashtagsPosts" ADD CONSTRAINT "hashtagsPosts_fk1" FOREIGN KEY ("postId") REFERENCES "posts"("id");


ALTER TABLE "postsUsers-likes" ADD CONSTRAINT "postsUsers-likes_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");
ALTER TABLE "postsUsers-likes" ADD CONSTRAINT "postsUsers-likes_fk1" FOREIGN KEY ("postId") REFERENCES "posts"("id");

ALTER TABLE "followers" ADD CONSTRAINT "followers_fk0" FOREIGN KEY ("request") REFERENCES "users"("id");
ALTER TABLE "followers" ADD CONSTRAINT "followers_fk1" FOREIGN KEY ("requested") REFERENCES "users"("id");

ALTER TABLE "coemments" ADD CONSTRAINT "coemments_fk0" FOREIGN KEY ("postId") REFERENCES "posts"("id");
ALTER TABLE "coemments" ADD CONSTRAINT "coemments_fk1" FOREIGN KEY ("userId") REFERENCES "users"("id");
ALTER TABLE "coemments" ADD CONSTRAINT "coemments_fk2" FOREIGN KEY ("text") REFERENCES "users"("id");

ALTER TABLE "reposts" ADD CONSTRAINT "reposts_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");
ALTER TABLE "reposts" ADD CONSTRAINT "reposts_fk1" FOREIGN KEY ("postId") REFERENCES "posts"("id");









