# Ads Dashboard

> One of our front end engineers have implemented a render function (its
> signature is render(startIndex, endIndex)) which receive the start and end index
> of the log items that need to be rendered and render the log items super fast in
> the UI.
> How would you use this render function to render the log list as fast as possible
> (optimal time complexity) ?

To use this function, I would first need to convert from start/end timestamp to index. Given an ordered list of logs, all logs within the time range, will be within the index range.

I'm currently maintaining two lists of ads in a normalized model, one that saves all the **ids** of all the ads, and the other saves the ids of all the ads within the filtered range. The actual ads are saved in a key-value store.
given the function `render(startIndex, endIndex)`, I would reconsider this, and instead save one list of ads, as well as the start and end of the filtered range, and the start and end timestamps.

Of course, we still have the problem of updating the indexes when the range change and when the list updates:
1. For the case of **end** timestamp change, we need to iterate through the list, starting from the `endIndex`, the index of the last log entry within our time range is the new `endIndex`.

2. For the case of **start** timestamp change, we need search the list from the beginning until `startIndex` fro our new `startIndex`.

3. When the list updates, we only need to check if the timestamp of of the new log entry is within the range, if it is, the length of our list is now the new `endIndex`.
