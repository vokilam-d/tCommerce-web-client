# tCommerce-web-client

Continuous delivery is based on GIT tags.

For deployment, you simply need to create a git tag and push it:

```
git tag v1.2.3 && git push --tags
```
  
 
Tag name needs to be an incremented current version of the project. Increment according to [SEMVER](https://semver.org/).
 
P.S. To view existing tags sorted by name:
```
git tag -l --sort=-v:refname
```
