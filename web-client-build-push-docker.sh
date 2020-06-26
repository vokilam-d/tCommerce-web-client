CI_REGISTRY_IMAGE=vokilamd/tcommerce-web-client

docker pull ${CI_REGISTRY_IMAGE}:builder
docker pull ${CI_REGISTRY_IMAGE}:latest

docker build \
  --target builder \
  --cache-from ${CI_REGISTRY_IMAGE}:builder \
  -t ${CI_REGISTRY_IMAGE}:builder \
  .
docker build \
  --cache-from ${CI_REGISTRY_IMAGE}:latest \
  --cache-from ${CI_REGISTRY_IMAGE}:builder \
  -t ${CI_REGISTRY_IMAGE}:latest \
  .

docker push ${CI_REGISTRY_IMAGE}:builder
docker push ${CI_REGISTRY_IMAGE}:latest
