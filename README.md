# Comi API

Restful API for my personal use and will continue to updated

# How to Use

1. Clone repository
2. Install dependecies using `npm install`
3. Remove .development in .env.development and add PORT and BASE_URL
4. Start the API
   ```bash
   npm run dev or nodemon .
   ```
5. Visit http://localhost:PORT/api to check is API success

# Documentation

## Hot Comics

Get Daily Hot Comic

```
/hots
```

## Update Comics

Get Daily Update Comic

```
/updates
```

## Trending Comics

Get Daily, Weekly, and All Time Trending Comic

```
/trendings
```

## Detail of Comic

Get Detail of Comic

```
/detail/:slug
```

## Read Comic

```
/read/:slug/:chapter
```

## Project Comics

```
/project/page/:page
```

## Mirror Comics

```
/mirror/page/:page
```

## Search Comics

```
/search/:query
```
