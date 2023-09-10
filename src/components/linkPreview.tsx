import { LinkPreview as RNLinkPreview } from "@flyerhq/react-native-link-preview";
import { Globe } from "@tamagui/lucide-icons";
import { openURL } from "expo-linking";
import { Skeleton } from "moti/skeleton";
import { Card, H6, Image, Label, Stack, XStack, getTokenValue } from "tamagui";

export default function LinkPreview({ url }: { url: string }) {
  const thumbnailBorderRadius = getTokenValue("$4", "radius");

  return (
    <RNLinkPreview
      text={url}
      renderLinkPreview={({ previewData }) => (
        <Card
          elevate
          onPress={() => openURL(url)}
          pressStyle={{ opacity: 0.5 }}
          h="$8"
        >
          <Skeleton.Group show={!previewData}>
            <XStack f={1}>
              <Stack ai="center" f={0.4} jc="center" theme="alt2">
                {previewData?.image ? (
                  <Image
                    borderTopLeftRadius={thumbnailBorderRadius}
                    borderBottomLeftRadius={thumbnailBorderRadius}
                    fadeDuration={200}
                    resizeMode="cover"
                    source={{
                      uri: previewData?.image.url,
                    }}
                    style={{ height: "100%", width: "100%" }}
                  />
                ) : (
                  <Globe size="$icon.lg" />
                )}
              </Stack>
              <Card.Header f={1} h="100%" jc="center" space="$1.5">
                <Skeleton colorMode="light" width="100%">
                  {previewData?.title && (
                    <H6
                      fontWeight="800"
                      fontFamily="$heading"
                      userSelect="none"
                      numberOfLines={1}
                    >
                      {previewData.title}
                    </H6>
                  )}
                </Skeleton>
                <Skeleton colorMode="light" width="100%">
                  {previewData?.link && (
                    <Label numberOfLines={1} theme="alt2" lineHeight={0}>
                      {previewData.link}
                    </Label>
                  )}
                </Skeleton>
              </Card.Header>
            </XStack>
          </Skeleton.Group>
        </Card>
      )}
    />
  );
}
