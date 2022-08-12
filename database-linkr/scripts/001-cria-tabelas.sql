CREATE TABLE users (
	"id" serial NOT NULL,
	"email" varchar NOT NULL UNIQUE,
	"password" varchar NOT NULL,
	"username" varchar NOT NULL UNIQUE,
	"pictureUrl" varchar NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE posts (
	"id" serial NOT NULL,
	"url" varchar NOT NULL,
	"message" varchar,
	"userId" integer NOT NULL,
	"likes" integer NOT NULL DEFAULT '0',
	CONSTRAINT "posts_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "hashtagsPosts" (
	"id" serial NOT NULL,
	"url" varchar NOT NULL,
	"hashtagId" integer NOT NULL,
	"postId" integer NOT NULL,
	CONSTRAINT "hashtagsPosts_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE hashtags (
	"id" serial NOT NULL,
	"hashtag" varchar(255) NOT NULL UNIQUE,
	CONSTRAINT "hashtags_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "posts" ADD CONSTRAINT "posts_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");

ALTER TABLE "hashtagsPosts" ADD CONSTRAINT "hashtagsPosts_fk0" FOREIGN KEY ("hashtagId") REFERENCES "hashtags"("id");
ALTER TABLE "hashtagsPosts" ADD CONSTRAINT "hashtagsPosts_fk1" FOREIGN KEY ("postId") REFERENCES "posts"("id");






